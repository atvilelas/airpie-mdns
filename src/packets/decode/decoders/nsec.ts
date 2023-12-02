import { Packet, Decoder, MDNS_RECORD_TYPES, NSEC } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@airpie/common-misc';
import { name } from './name';
import { typesInBitmap } from './typesInBitmap';

export const nsec: Decoder<Packet<NSEC>> = (buffer, options) => {
  const { offset, payloadFields, length } = options || {};

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? buffer.length;
  const frameOffset = options?.frameOffset ?? -1;

  const nextDomain = name(buffer, { offset: decodingOffset, frameOffset });
  decodingOffset += nextDomain.bytes;
  const decodedTypesInBitmat = typesInBitmap(buffer, {
    offset: decodingOffset,
    length: decodingLength - (decodingOffset - baseOffset),
  });
  decodingOffset += decodedTypesInBitmat.bytes;

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    nextDomain: nextDomain.value,
    resourceRecordTypesInBitmap: (decodedTypesInBitmat.types || []).map((type) => type.name),
    details: {
      nextDomain,
      resourceRecordTypesInBitmap: decodedTypesInBitmat,
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.NSEC),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.NSEC] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
