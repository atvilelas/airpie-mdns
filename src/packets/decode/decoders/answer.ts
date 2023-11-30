import { getNumeral } from '@utils';
import { name } from './name';
import { Packet, Decoder, MDNS_QUESTION_CLASSES, Answer, Name, MDNS_RECORD_TYPES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { record } from './record';

export const answer: Decoder<Packet<Answer>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const frameOffset = options?.frameOffset ?? -1;

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  let decodedName: Packet<Name> = {
    bytes: 1,
    bytePosition: decodingOffset + 1,
    readingBuffer: buffer.subarray(decodingOffset, decodingOffset + 1),
    value: '<Root Record>',
    length: 1,
    labels: [],
    complete: false,
    hasPointer: false,
  };
  if (buffer.readUint8(decodingOffset) !== 0x00) {
    // not root record
    decodedName = name(buffer, { offset: decodingOffset, frameOffset });
  }

  decodingOffset += decodedName.bytes;
  const typeValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const classCacheFlushValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const classValue = Number.parseInt(classCacheFlushValue.toString(2).padStart(16, '0').slice(1), 2);
  const cacheFlush = classCacheFlushValue.toString(2).padStart(16, '0').slice(0, 1) === '0' ? false : true;
  const classNumeral = getNumeral(classValue);
  const typeNumeral = getNumeral(typeValue);

  const ttl = buffer.readUInt32BE(decodingOffset);
  decodingOffset += 4;

  const length = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;

  const recordDecoder = record(typeValue);
  const decodedRecord = recordDecoder(buffer, {
    offset: decodingOffset,
    frameOffset,
    length,
    labels: decodedName.labels,
  });
  decodingOffset += decodedRecord.bytes;

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    name: decodedName.value,
    class: classNumeral,
    type: typeNumeral,
    cacheFlush,
    ttl,
    length,
    data: decodedRecord,
    details: {
      name: {
        value: decodedName.value,
        length: decodedName.length,
        labels: decodedName.labels,
        complete: decodedName.complete,
        hasPointer: decodedName.hasPointer,
      },
      class: {
        value: classNumeral,
        name: MDNS_QUESTION_CLASSES[classValue] as keyof typeof MDNS_QUESTION_CLASSES,
      },
      type: {
        value: typeNumeral,
        name: MDNS_RECORD_TYPES[typeValue] as keyof typeof MDNS_RECORD_TYPES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
