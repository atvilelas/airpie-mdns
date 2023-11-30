import { Question } from '../decode/types';
import { name } from './name';

export const question = (data: Question): Buffer => {
  let encodingLength = Buffer.byteLength((data?.name || '').replace(/^\.|\.$/gm, '')) + 2;
  if (data.name === '.' || data.name === '..') {
    encodingLength = 1;
  }
  encodingLength += 4;
  const encodingBuffer = Buffer.alloc(encodingLength);
  let encodingOffset = 0;

  const encodedName = name(data.name || '');
  encodedName.copy(encodingBuffer, encodingOffset);
  encodingOffset += encodedName.length;

  encodingBuffer.writeUInt16BE(+(data?.type || 0), encodingOffset);
  encodingOffset += 2;

  encodingBuffer.writeUInt16BE(+(data.class || 0), encodingOffset);
  encodingOffset += 2;

  return encodingBuffer;
};
