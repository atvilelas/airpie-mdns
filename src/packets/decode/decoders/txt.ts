import { Packet, Decoder, TXT, MDNS_RECORD_TYPES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@airpie/common-misc';

export const txt: Decoder<Packet<TXT>> = (buffer, options) => {
  const { offset, payloadFields, length } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? decodingOffset;

  let remaining = decodingLength;

  const data: Record<string, string> = {};
  const keys = [];
  const values = [];

  while (remaining > 0) {
    const length = buffer[decodingOffset];
    decodingOffset++;
    remaining--;
    if (remaining < length) {
      throw new Error('Buffer overflow');
    }
    const reading = buffer.subarray(decodingOffset, decodingOffset + length).toString();
    const [key, value] = reading.split('=');
    data[key] = value || '';
    keys.push(key);
    values.push(value || '');
    decodingOffset += length;
    remaining -= length;
  }

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    data,
    values,
    keys,
    type: getNumeral(MDNS_RECORD_TYPES.TXT),
    details: {
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.TXT),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.TXT] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
