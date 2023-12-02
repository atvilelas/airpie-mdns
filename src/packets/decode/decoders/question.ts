import { getNumeral } from '@airpie/common-misc';
import { name } from './name';
import { Packet, Question, Decoder, MDNS_RECORD_TYPES, MDNS_QUESTION_CLASSES } from '../types';
import { cleanupPayload } from '../../utils/cleanupPayload';

export const question: Decoder<Packet<Question>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const frameOffset = options?.frameOffset ?? -1;

  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const decodedName = name(buffer, { offset: decodingOffset, frameOffset });
  decodingOffset += decodedName.bytes;
  const typeValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const typeNumeral = getNumeral(typeValue);
  const classResponseValue = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const classValue = Number.parseInt(classResponseValue.toString(2).padStart(16, '0').slice(1), 2);
  const response = classResponseValue.toString(2).padStart(16, '0').slice(0, 1) === '0' ? false : true;
  const classNumeral = getNumeral(classValue);

  const payload = {
    bytes: decodingOffset - baseOffset,
    bytePosition: decodingOffset,
    buffer,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    name: decodedName.value,
    type: typeNumeral,
    classNumeral: classNumeral,
    response,
    details: {
      name: {
        value: decodedName.value,
        length: decodedName.length,
        labels: decodedName.labels,
        complete: decodedName.complete,
        hasPointer: decodedName.hasPointer,
      },
      type: {
        value: typeNumeral,
        name: MDNS_RECORD_TYPES[typeValue] as keyof typeof MDNS_RECORD_TYPES,
      },
      class: {
        value: classNumeral,
        name: MDNS_QUESTION_CLASSES[classValue] as keyof typeof MDNS_QUESTION_CLASSES,
      },
    },
  };

  return cleanupPayload(payload, payloadFields);
};
