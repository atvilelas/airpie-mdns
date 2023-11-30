import { MDNS_RESOURCE_RECORDS_TYPES } from '../../types';
import { question } from './question';
import { Answer, Decoder, List, ListOptions, Packet, Question } from '../types';
import { answer } from './answer';
import { cleanupPayload } from '../../utils/cleanupPayload';

type PossibleListOf = Question | Answer;
export const list = <T extends PossibleListOf = object>(
  buffer: Buffer,
  options: {
    offset?: number;
    frameOffset?: number;
    payloadFields?: { [key in keyof Packet<T>]?: boolean };
  } & ListOptions,
): Packet<List<T>> => {
  const { offset, count, type, payloadFields } = options || {};
  const frameOffset = options?.frameOffset ?? -1;
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  let decoder: Decoder<Packet<T>> | undefined = undefined;
  switch (type) {
    case MDNS_RESOURCE_RECORDS_TYPES.QUESTION:
      decoder = question as Decoder<Packet<T>>;
      break;
    case MDNS_RESOURCE_RECORDS_TYPES.ANSWER:
      decoder = answer as Decoder<Packet<T>>;
      break;
    default:
      break;
  }
  if (!decoder) {
    throw new Error('Could not determine list item types');
  }
  const decodedLists = new Array(count).fill(null).map(() => {
    const decodedItem = decoder!(buffer, { offset: decodingOffset, frameOffset });
    decodingOffset += decodedItem.bytes;
    return decodedItem;
  });

  const payload = { bytes: decodingOffset - baseOffset, value: decodedLists } as Packet<List<T>>;
  return cleanupPayload<Packet<List<T>>>(payload, payloadFields);
};
