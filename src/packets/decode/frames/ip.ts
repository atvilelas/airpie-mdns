import { Packet, IPv4Frame, IPv6Frame, Decoder } from '../types';
import { ipv4 } from '../decoders/ipv4';
import { ipv6 } from '../decoders/ipv6';

export const ip: Decoder<Packet<IPv4Frame | IPv6Frame>> = (buffer, options) => {
  const { offset } = options || {};
  const baseOffset = offset || 0;

  const versionLengthRaw = buffer.readUInt8(baseOffset);
  const versionLengthBinary = versionLengthRaw.toString(2).padStart(8, '0');
  const versionBinary = versionLengthBinary.slice(0, 4);
  const version = parseInt(versionBinary, 2);
  if (version === 4) {
    return ipv4(buffer, options);
  }
  if (version === 6) {
    return ipv6(buffer, options);
  }

  throw new Error(`Invalid IP version. Expected 4 or 6 received ${version}`);
};
