import { getNumeral } from '@utils';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { Decoder, Packet, UDPProtocol } from '../types';

export const udp: Decoder<Packet<UDPProtocol>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const sourcePort = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const destinationPort = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const length = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const checksum = buffer.readUInt16BE(decodingOffset);
  const checksumNumeral = getNumeral(checksum);
  decodingOffset += 2;
  const previousOffset = decodingOffset - baseOffset;

  const readingBuffer = buffer.subarray(baseOffset, decodingOffset);
  const payload: Packet<UDPProtocol> = {
    bytes: previousOffset,
    bytePosition: decodingOffset,
    readingBuffer: readingBuffer,
    buffer,
    sourcePort,
    destinationPort,
    length,
    checksum: checksumNumeral,
  };

  return cleanupPayload(payload, payloadFields);
};
