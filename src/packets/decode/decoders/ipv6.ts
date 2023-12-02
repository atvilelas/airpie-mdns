import { IPV6_SIZE, decodeIPv6 } from '@airpie/common-network';
import { Packet, DCSP_VALUES, ECN_VALUES, IP_PROTOCOLS, IPv6Frame, Decoder } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@airpie/common-misc';

export const ipv6: Decoder<Packet<IPv6Frame>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const versionLengthRaw = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;
  const versionLengthBinary = versionLengthRaw.toString(2).padStart(8, '0');
  const versionBinary = versionLengthBinary.slice(0, 4);
  const version = parseInt(versionBinary, 2);
  if (version !== 6) {
    throw new Error(`Invalid IPV6 payload. Version bits must equal 6. Version found ${version}.`);
  }
  const flowLabelDcspValue = buffer.readUIntBE(decodingOffset, 3).toString(2).padStart(24, '0');
  decodingOffset += 3;
  const dcspValue = parseInt(flowLabelDcspValue.slice(0, 8), 2);
  const flowLabelValue = parseInt(flowLabelDcspValue.slice(8), 2);

  const length = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const protocol = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;
  const hopLimit = buffer.readUInt8(decodingOffset);
  decodingOffset += 1;

  const dcspBinary = dcspValue.toString(2).padStart(8, '0').slice(0, 6);
  const ecnBinary = dcspValue.toString(2).padStart(8, '0').slice(-2);
  const sourceIpBuffer = buffer.subarray(decodingOffset, decodingOffset + IPV6_SIZE);
  decodingOffset += IPV6_SIZE;
  const destinationIpBuffer = buffer.subarray(decodingOffset, decodingOffset + IPV6_SIZE);
  decodingOffset += IPV6_SIZE;
  const sourceIP = decodeIPv6(sourceIpBuffer);
  const destinationIP = decodeIPv6(destinationIpBuffer);
  const readingBuffer = buffer.subarray(baseOffset, decodingOffset);
  const previousOffset = decodingOffset - baseOffset;

  const dcspNumeral = getNumeral(Number.parseInt(dcspBinary, 2));
  const ecnNumeral = getNumeral(Number.parseInt(ecnBinary, 2));
  const protocolNumeral = getNumeral(protocol);
  const payload: Packet<IPv6Frame> = {
    readingBuffer,
    bytes: previousOffset,
    bytePosition: decodingOffset,
    version: version,
    flowLabel: getNumeral(flowLabelValue),
    hopLimit,
    dcsp: dcspNumeral,
    ecn: ecnNumeral,
    length,
    protocol: protocolNumeral,
    sourceIP,
    destinationIP,
    details: {
      flowLabel: getNumeral(flowLabelValue),
      dcsp: {
        value: dcspNumeral,
        name: DCSP_VALUES[Number.parseInt(dcspNumeral.binary, 2)] as keyof typeof DCSP_VALUES,
      },
      ecn: {
        value: ecnNumeral,
        name: ECN_VALUES[Number.parseInt(ecnNumeral.binary, 2)] as keyof typeof ECN_VALUES,
      },
      protocol: {
        value: protocolNumeral,
        name: IP_PROTOCOLS[protocol] as keyof typeof IP_PROTOCOLS,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
