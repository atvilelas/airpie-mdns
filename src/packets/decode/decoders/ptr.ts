import { getNumeral } from '@airpie/common-misc';
import { name } from './name';
import { Packet, Decoder, MDNS_RECORD_TYPES, PTR } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';

export const ptr: Decoder<Packet<PTR>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const frameOffset = options?.frameOffset ?? -1;

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const decodedName = name(buffer, { offset: decodingOffset, frameOffset });
  decodingOffset += decodedName.bytes;

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    domainName: decodedName.value,
    details: {
      domainName: {
        value: decodedName.value,
        length: decodedName.length,
        labels: decodedName.labels,
        complete: decodedName.complete,
        hasPointer: decodedName.hasPointer,
      },
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.PTR),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.PTR] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
