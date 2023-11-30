import { Packet, Decoder, MDNS_RECORD_TYPES, AAAA } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';
import { decodeIPv6 } from '@airpie/common-network';

export const aaaa: Decoder<Packet<AAAA>> = (buffer, options) => {
  const { offset, payloadFields, length } = options || {};

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? buffer.length;
  const ipBuffer = buffer.subarray(decodingOffset, decodingOffset + decodingLength);
  const ip = decodeIPv6(ipBuffer);
  decodingOffset += decodingLength;
  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    ip,
    details: {
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.AAAA),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.AAAA] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
