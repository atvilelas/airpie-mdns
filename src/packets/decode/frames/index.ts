import { cleanupPayload } from '../../utils/cleanupPayload';
import { Decoder, Frame, IP_PROTOCOLS, Packet } from '../types';
import { ethernet } from './ethernet';
import { ip } from './ip';
import { udp } from '../protocols/udp';

export const frame: Decoder<Packet<Frame>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;

  const internalPayloadExclusionFields = {
    bytePosition: false,
    buffer: false,
    readingBuffer: false,
  };
  const ethernetFrame = ethernet(buffer, {
    payloadFields: internalPayloadExclusionFields,
    offset: decodingOffset,
  });
  decodingOffset += ethernetFrame.bytes;
  const ipFrame = ip(buffer, {
    payloadFields: internalPayloadExclusionFields,
    offset: decodingOffset,
  });
  decodingOffset += ipFrame.bytes;
  let protocol;
  switch (ipFrame!.protocol.decimal) {
    case IP_PROTOCOLS.UDP: {
      protocol = udp(buffer, {
        payloadFields: internalPayloadExclusionFields,
        offset: decodingOffset,
      });
      decodingOffset += protocol.bytes;
      break;
    }

    default:
      break;
  }
  const previousOffset = decodingOffset - baseOffset;
  const readingBuffer = buffer.subarray(baseOffset, baseOffset + decodingOffset);

  const payload: Packet<Frame> = {
    bytes: previousOffset,
    bytePosition: decodingOffset,
    readingBuffer: readingBuffer,
    buffer,
    ethernet: ethernetFrame,
    ip: ipFrame,
    protocol,
  };

  return cleanupPayload(payload, payloadFields);
};
