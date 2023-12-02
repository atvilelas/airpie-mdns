import { getNumeral } from '@airpie/common-misc';
import { cleanupPayload } from '../../utils/cleanupPayload';
import {
  Decoder,
  MDNSFlagResponseCode,
  MDNSFlags,
  MDNSHeader,
  MDNS_FLAG_RESPONSE_CODES,
  MDNS_FLAG_RESPONSE_CODE_NAMES,
  Packet,
} from '../types';

export const header: Decoder<Packet<MDNSHeader>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  if (buffer.length < 12) throw new Error(`Invalid payload size for header. Expected 12 received ${buffer.length}`);

  const id = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const flagValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;

  const questions = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const answerResourceRecords = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const authorityResourceRecords = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const additionalResourceRecords = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;

  const flagNumeral = getNumeral(flagValue);

  const flags: MDNSFlags = {
    value: flagNumeral,
    query: flagNumeral.isNthBitOff(15),
    reply: flagNumeral.isNthBitOn(15),
    operationCode: flagNumeral.getNthBit(11) & 0b1111, // Bitwise AND
    aa: flagNumeral.isNthBitOn(10),
    tc: flagNumeral.isNthBitOn(9),
    rd: flagNumeral.isNthBitOn(8),
    ra: flagNumeral.isNthBitOn(7),
    z: flagNumeral.getNthBit(6),
    ad: flagNumeral.isNthBitOn(5),
    cd: flagNumeral.isNthBitOn(4),
    rcode: flagNumeral.decimal & 0b1111, // Bitwise AND
  };
  const flagResponseCode = getNumeral(flags.rcode);

  const responseCode: MDNSFlagResponseCode = {
    value: flagResponseCode,
    code: MDNS_FLAG_RESPONSE_CODES[flags.rcode] as keyof typeof MDNS_FLAG_RESPONSE_CODES,
    name: MDNS_FLAG_RESPONSE_CODE_NAMES[flags.rcode] as keyof typeof MDNS_FLAG_RESPONSE_CODE_NAMES,
  };
  flags.details = {
    authoritativeAnswer: flags.aa,
    truncation: flags.tc,
    recursionDesired: flags.rd,
    recursionAvailable: flags.ra,
    authenticatedAnswer: flags.ad,
    unacceptable: flags.cd,
    zero: flags.z,
    responseCode,
  };

  const readingBuffer = buffer.subarray(baseOffset, decodingOffset);
  const previousOffset = decodingOffset - baseOffset;
  const payload: Packet<MDNSHeader> = {
    readingBuffer,
    buffer,
    bytes: previousOffset,
    bytePosition: decodingOffset,
    id: id,
    flags: flagNumeral,
    questions,
    answerResourceRecords,
    authorityResourceRecords,
    additionalResourceRecords,
    details: {
      flags,
    },
  };

  return cleanupPayload(payload, payloadFields);
};
