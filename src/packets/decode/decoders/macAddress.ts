import { getMacVendor } from '@airpie/common-network';
import { ETHERNET_CAST_TYPE, ETHERNET_INDENTIFIER, MacAddress, Packet } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';

export const macAddress = (
  buffer: Buffer,
  options?: { offset?: number; payloadFields?: Partial<{ [key in keyof Packet<MacAddress>]: boolean }> },
): Packet<MacAddress> => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const readingBuffer = buffer.subarray(decodingOffset, decodingOffset + 6);
  const macAddress = new Array(6).fill(0).map(() => {
    const section = buffer.readUInt8(decodingOffset);
    decodingOffset += 1;
    return `00${section.toString(16)}`.slice(-2);
  });

  const castType = Number.parseInt(macAddress[0], 16) & 1;
  const identifier = (Number.parseInt(macAddress[0], 16) >> 1) & 1;

  const previousOffset = decodingOffset - baseOffset;
  const payload: Packet<MacAddress> = {
    bytes: previousOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: readingBuffer,

    address: macAddress.join(':'),
    octets: macAddress.map((octet) => Number.parseInt(octet, 16)),
    castType,
    identifier,
    castTypeName: ETHERNET_CAST_TYPE[castType] as keyof typeof ETHERNET_CAST_TYPE,
    identifierName: ETHERNET_INDENTIFIER[identifier] as keyof typeof ETHERNET_INDENTIFIER,
    vendor: getMacVendor(macAddress),
  };

  return cleanupPayload(payload, payloadFields);
};
