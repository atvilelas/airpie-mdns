import { getNumeral } from '@airpie/common-misc';
import { cleanupPayload } from '../../utils/cleanupPayload';
import { macAddress } from '../decoders/macAddress';
import { Decoder, ETHERNET_TYPES, EthernetFrame, Packet } from '../types';

export const ethernet: Decoder<Packet<EthernetFrame>> = (buffer, options) => {
  const { offset, payloadFields } = options || {};
  const baseOffset = offset || 0;
  let decodingOffset = baseOffset;
  const internalPayloadExclusionFields = {
    bytePosition: false,
    buffer: false,
    readingBuffer: false,
  };

  const sourceMacAddress = macAddress(buffer, {
    payloadFields: internalPayloadExclusionFields,
    offset: decodingOffset,
  });
  decodingOffset += sourceMacAddress.bytes;
  const destinationMacAddress = macAddress(buffer, {
    offset: decodingOffset,
    payloadFields: internalPayloadExclusionFields,
  });
  decodingOffset += destinationMacAddress.bytes;
  if (buffer.readUint16BE(decodingOffset) === 0x8100) {
    // VPN Packet - Not implemented
    decodingOffset += 4;
  }
  const readingBuffer = buffer.subarray(decodingOffset, decodingOffset + 2);
  const protocolType = buffer.readUInt16BE(decodingOffset);
  decodingOffset += 2;
  const previousOffset = decodingOffset - baseOffset;
  const protocolNumeral = getNumeral(protocolType);
  const payload: Packet<EthernetFrame> = {
    bytes: previousOffset,
    bytePosition: decodingOffset,
    readingBuffer: readingBuffer,
    buffer,
    protocol: protocolNumeral,
    sourceMacAddress: sourceMacAddress.address,
    destinationMacAddress: destinationMacAddress.address,
    details: {
      protocol: {
        value: protocolNumeral,
        name: ETHERNET_TYPES[protocolType] as keyof typeof ETHERNET_TYPES,
      },
      sourceMacAddress: sourceMacAddress,
      destinationMacAddress: destinationMacAddress,
    },
  };

  return cleanupPayload(payload, payloadFields);
};
