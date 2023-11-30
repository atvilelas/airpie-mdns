import { Packet, Decoder, Raw, RawDecodedOptions, MDNS_RECORD_TYPES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';

export const raw: Decoder<Packet<Raw>, RawDecodedOptions> = (buffer, options) => {
  const { offset, length, payloadFields, type } = options || {};
  const decodingOffset = offset || 0;
  const decodingLength = length || buffer.length - decodingOffset;
  const decodingType = type ?? MDNS_RECORD_TYPES.UNKNOWN;
  const typeNumeral = getNumeral(decodingType);
  const payload = {
    bytes: decodingLength,
    bytePosition: decodingOffset + decodingLength,
    buffer,
    readingBuffer: buffer.subarray(decodingOffset, decodingOffset + decodingLength),
    value: buffer.subarray(decodingOffset, decodingOffset + decodingLength),
    type: typeNumeral,
    details: {
      type: {
        value: typeNumeral,
        name: (MDNS_RECORD_TYPES[+typeNumeral] ||
          MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.UNKNOWN]) as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};

export const RawFactory = (type: number): Decoder<Packet<Raw>, RawDecodedOptions> => {
  const wrapper: Decoder<Packet<Raw>, RawDecodedOptions> = (buffer, options) => {
    return raw(buffer, { ...(options || {}), type });
  };
  return wrapper;
};
