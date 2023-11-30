import { IPV4_SIZE, decodeIPv4 } from '@airpie/common-network';
import { Packet, DCSP_VALUES, ECN_VALUES, IP_PROTOCOLS, IPv4Frame, Decoder } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';
import { Binary } from '@utils/types';

export const ipv4: Decoder<Packet<IPv4Frame>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const versionLengthRaw = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;
  const versionLengthBinary = versionLengthRaw.toString(2).padStart(8, '0');
  const versionBinary = versionLengthBinary.slice(0, 4);
  const version = parseInt(versionBinary, 2);
  if (version !== 4) {
    throw new Error(`Invalid IPV4 payload. Version bits must equal 4. Version found ${version}.`);
  }
  const dcspRaw = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;

  const length = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const identification = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const fragmentOffsetValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const ttl = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;
  const protocol = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;
  const checksum = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const headerLengthBinary = versionLengthBinary.slice(-4);
  const dcspBinary = dcspRaw.toString(2).padStart(8, '0').slice(0, 6);
  const ecnBinary = dcspRaw.toString(2).padStart(8, '0').slice(-2);
  const sourceIpBuffer = buffer.subarray(decodingOffset, decodingOffset + IPV4_SIZE);
  decodingOffset += IPV4_SIZE;
  const destinationIpBuffer = buffer.subarray(decodingOffset, decodingOffset + IPV4_SIZE);
  decodingOffset += IPV4_SIZE;
  const sourceIP = decodeIPv4(sourceIpBuffer);
  const destinationIP = decodeIPv4(destinationIpBuffer);
  const readingBuffer = buffer.subarray(baseOffset, decodingOffset);
  const previousOffset = decodingOffset - baseOffset;
  const dcspNumeral = getNumeral(Number.parseInt(dcspBinary, 2));
  const ecnNumeral = getNumeral(Number.parseInt(ecnBinary, 2));
  const protocolNumeral = getNumeral(protocol);
  const identificationNumeral = getNumeral(identification, { hex: 4 });
  const flagsNumeral = getNumeral(`0b${fragmentOffsetValue.toString(2).slice(0, 3)}` as Binary, { binary: 3 });
  const checksumNumeral = getNumeral(checksum, { hex: 4 });
  const flagFragmentsBinary = fragmentOffsetValue.toString(2).padStart(16, '0');
  const fragmentOffset = getNumeral(parseInt(flagFragmentsBinary.slice(3), 2), { binary: 13 });
  const flagReserved = fragmentOffset.getNthBit(0);
  const flagDF = fragmentOffset.isNthBitOn(1);
  const flagMF = fragmentOffset.isNthBitOn(2);

  const payload: Packet<IPv4Frame> = {
    readingBuffer,
    bytes: previousOffset,
    bytePosition: decodingOffset,
    buffer,
    version: version,
    headerLength: parseInt(headerLengthBinary, 2) * 4, // Number of bytes,
    dcsp: dcspNumeral,
    ecn: ecnNumeral,
    length,
    identification: identificationNumeral,
    fragmentOffset,
    flags: flagsNumeral,
    ttl,
    protocol: protocolNumeral,
    checksum: checksumNumeral,
    sourceIP,
    destinationIP,
    details: {
      dcsp: {
        value: dcspNumeral,
        name: DCSP_VALUES[Number.parseInt(dcspNumeral.binary, 2)] as keyof typeof DCSP_VALUES,
      },
      ecn: {
        value: ecnNumeral,
        name: ECN_VALUES[Number.parseInt(ecnNumeral.binary, 2)] as keyof typeof ECN_VALUES,
      },
      identification: identificationNumeral,
      flags: {
        reserved: flagReserved,
        DF: flagDF,
        MF: flagMF,
      },
      protocol: {
        value: protocolNumeral,
        name: IP_PROTOCOLS[protocol] as keyof typeof IP_PROTOCOLS,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
