import { udp } from './udp';

const udpPayloadMock: number[] = [0x14, 0xe9, 0x14, 0xe9, 0x05, 0x17, 0xf6, 0xf9];

describe('Test UDP Payload within a MDNS Packet', () => {
  it('returns the source port, for MDNS it should always be 5353', () => {
    expect(udp(Buffer.from(udpPayloadMock)).sourcePort).toBe(5353);
  });

  it('returns the destination port, for MDNS it should always be 5353', () => {
    expect(udp(Buffer.from(udpPayloadMock)).sourcePort).toBe(5353);
  });

  it('returns the source port as the first 2 bytes of payload', () => {
    expect(udp(Buffer.from(udpPayloadMock)).sourcePort).toBe(Buffer.from(udpPayloadMock).readUInt16BE(0));
  });

  it('returns the destination port as the 2nd and 3rd bytes of payload', () => {
    expect(udp(Buffer.from(udpPayloadMock)).sourcePort).toBe(Buffer.from(udpPayloadMock).readUInt16BE(2));
  });

  it('returns the payload length read from 4th and 5th bytes of payload', () => {
    expect(udp(Buffer.from(udpPayloadMock)).length).toBe(Buffer.from(udpPayloadMock).readUInt16BE(4));
  });

  it('returns the payload checksum read from 6th and 7th bytes of payload', () => {
    expect(udp(Buffer.from(udpPayloadMock)).checksum.decimal).toBe(Buffer.from(udpPayloadMock).readUInt16BE(6));
  });
});
