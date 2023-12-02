import { cleanupPayload } from '../../utils/cleanupPayload';
import { Decoder, Name, Packet } from '../types';

export const name: Decoder<Packet<Name>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const frameOffset = options?.frameOffset ?? -1;
  const octets = [];
  let previousOffset = offset || 0;
  let totalLength = 0;
  let consumedBytes = 0;
  let hasPointer = false;
  let complete = false;

  while (true) {
    if (decodingOffset >= buffer.length) {
      throw new Error(
        `Byte offset for decoding is beyound payload boundaries. Offset ${decodingOffset}, payload size ${buffer.length}`,
      );
    }
    const length = buffer.readUInt8(decodingOffset);
    decodingOffset += 1;
    consumedBytes += hasPointer ? 0 : 1;

    if (length === 0) {
      complete = true;
      break;
    }
    if ((length & 0xc0) === 0) {
      if (decodingOffset + length > buffer.length) {
        throw new Error(
          `Label length and offset is beyound payload boundaries. Offset ${decodingOffset + length}, payload size ${
            buffer.length
          }`,
        );
      }
      totalLength += length + 1;
      if (totalLength > 254) {
        throw new Error(`Maximum length of a given label is 255. Found ${totalLength}.`);
      }
      octets.push(buffer.toString('utf-8', decodingOffset, decodingOffset + length));
      decodingOffset += length;
      consumedBytes += hasPointer ? 0 : length;
    } else if ((length & 0xc0) === 0xc0) {
      if (decodingOffset + 1 > buffer.length) {
        throw new Error(
          `Byte offset for decoding is beyound payload boundaries. Offset ${decodingOffset + 1}, payload size ${
            buffer.length
          }`,
        );
      }
      const shiftOffset = buffer.readUInt16BE(decodingOffset - 1) - 0xc000;
      if (frameOffset === -1) {
        decodingOffset = shiftOffset;
        previousOffset = shiftOffset;
        consumedBytes += 1;
        complete = false;
        hasPointer = true;
        break;
      }
      if (shiftOffset >= previousOffset) {
        // Allow only pointers to prior data. RFC 1035, section 4.1.4 states:
        // "[...] an entire domain name or a list of labels at the end of a domain name
        // is replaced with a pointer to a prior occurance (sic) of the same name."
        throw new Error(
          `Label shifting is before decoding offset. Offset ${decodingOffset}, shifting position ${shiftOffset}`,
        );
      }
      decodingOffset = frameOffset + shiftOffset;
      previousOffset = frameOffset + shiftOffset;
      consumedBytes += hasPointer ? 0 : 1;
      hasPointer = true;
    } else {
      throw new Error('Invalid label.');
    }
  }

  if (totalLength === 0) {
    throw new Error('Wrong name or pointer. Empty labels.');
  }
  const value = octets.join('.');
  const payload = {
    bytes: consumedBytes,
    bytePosition: baseOffset + consumedBytes,
    readingBuffer: buffer.subarray(baseOffset, baseOffset + decodingOffset),
    value,
    length: value.length,
    labels: octets,
    complete,
    hasPointer,
    buffer,
  };

  return cleanupPayload(payload, payloadFields);
};
