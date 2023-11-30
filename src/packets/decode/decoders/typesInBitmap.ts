import { Packet, Decoder, MDNS_RECORD_TYPES, TypesInBitmap } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';

export const typesInBitmap: Decoder<Packet<TypesInBitmap>> = (buffer, options) => {
  const { offset, payloadFields, length } = options || {};
  const types = [];
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? buffer.length;

  while (decodingOffset - baseOffset < decodingLength) {
    const window = buffer.readUInt8(decodingOffset);
    decodingOffset += 1;
    const windowLength = buffer.readUInt8(decodingOffset);
    decodingOffset += 1;
    for (let i = 0; i < windowLength; i++) {
      const b = buffer.readUInt8(decodingOffset + i);
      for (let j = 0; j < 8; j++) {
        if (b & (1 << (7 - j))) {
          const typeValue = (window << 8) | (i << 3) | j;
          const typeNumeral = getNumeral(typeValue);
          const typeName = MDNS_RECORD_TYPES[typeValue] as keyof typeof MDNS_RECORD_TYPES;
          types.push({ name: typeName, value: typeNumeral });
        }
      }
    }
    decodingOffset += windowLength;
  }

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    types,
  };
  return cleanupPayload(payload, payloadFields);
};
