import { Packet, Decoder, A, MDNS_RECORD_TYPES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';
import { decodeIPv4 } from '@airpie/common-network';

export const a: Decoder<Packet<A>> = (buffer, options) => {
  const { offset, payloadFields, length } = options || {};

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? buffer.length;
  const ipBuffer = buffer.subarray(decodingOffset, decodingOffset + decodingLength);
  const ip = decodeIPv4(ipBuffer);
  decodingOffset += decodingLength;
  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    ip,
    details: {
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.A),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.A] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
