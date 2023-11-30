import { Question } from '../decode/types';
import { name } from './name';
import { question } from './question';

export const list = (data: Question[]): Buffer => {
  const encodedNames = data.map((item) => name(item.name || ''));
  const encodingBuffer = Buffer.alloc(data.reduce((size, _item, index) => size + encodedNames[index].length + 4, 0));
  let encodingOffset: number = 0;

  data.forEach((item) => {
    const encodedQuestion = question(item);
    encodedQuestion.copy(encodingBuffer, encodingOffset);
    encodingOffset += encodedQuestion.length;
  });
  return encodingBuffer;
};
