import { Question } from '../decode/types';
import { list } from './list';

export const header = (questions: Question[], transactionId?: number): Buffer => {
  const encodedQuestions = list(questions);
  const encodingLength = 12 + encodedQuestions.length;
  const encodingBuffer = Buffer.alloc(encodingLength);
  encodedQuestions.copy(encodingBuffer, 12);
  let encodingOffset = 0;
  const encodingTransactionId = transactionId ?? Math.floor(Math.random() * (0xffff - 0xc000) + 0xc000);
  // id
  encodingBuffer.writeUInt16BE(encodingTransactionId, encodingOffset);
  encodingOffset += 2;
  // flags
  encodingBuffer.writeUInt16BE(0x0120, encodingOffset);
  encodingOffset += 2;
  // # Questions
  encodingBuffer.writeUInt16BE(questions.length, encodingOffset);
  encodingOffset += 2;
  // # Answers
  encodingBuffer.writeUInt16BE(0x0000, encodingOffset);
  encodingOffset += 2;
  // # Authorities
  encodingBuffer.writeUInt16BE(0x0000, encodingOffset);
  encodingOffset += 2;
  // # Additionals
  encodingBuffer.writeUInt16BE(0x0000, encodingOffset);
  encodingOffset += 2;
  return encodingBuffer;
};
