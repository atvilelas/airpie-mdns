import { Packet, Decoder, SRV, MDNS_RECORD_TYPES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { getNumeral } from '@utils';
import { name } from './name';

export const srv: Decoder<Packet<SRV>> = (buffer, options) => {
  const { offset, payloadFields, length, labels } = options || {};
  const frameOffset = options?.frameOffset ?? -1;

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const decodingLength = length ?? buffer.length;
  const priority = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const weight = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const port = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const target = name(buffer, { offset: decodingOffset, frameOffset });
  decodingOffset += target.bytes;

  const decodingLabels = (labels || []).length > 0 ? labels : target.labels;

  const [region, protocol, service, ...recordLabelsReversed] = [...(decodingLabels || [])].reverse();
  const recordName = [...(recordLabelsReversed || [])].reverse().join('.');

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    service,
    protocol,
    region,
    name: recordName,
    length: decodingLength,
    priority,
    weight,
    port,
    target: target.value,
    details: {
      target: target,
      type: {
        value: getNumeral(MDNS_RECORD_TYPES.SRV),
        name: MDNS_RECORD_TYPES[MDNS_RECORD_TYPES.SRV] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
