import { RemoteInfo } from 'dgram';
// import { decode } from './packets/decode';
import { events } from './events';
import { decodeMDNSPacket } from './decodeMDNSPacket';

export const incomingPacket = (buffer: Buffer, remoteInfo: RemoteInfo) => {
  const decodedPacket = decodeMDNSPacket(buffer);
  events.emit('@mdns:packet-received', decodedPacket, buffer, remoteInfo);
};
