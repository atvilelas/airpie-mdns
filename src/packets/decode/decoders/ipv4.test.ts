// import { MDNSPacketPayloadMock } from '../../packets.test';
import { ipv4 } from './ipv4';

const ipv4PayloadMock: number[] = [
  0x45, 0x00, 0x04, 0xd7, 0x00, 0x65, 0x00, 0x00, 0xff, 0x11, 0x4c, 0x0d, 0x0a, 0x40, 0x7f, 0x68, 0xe0, 0x00, 0x00,
  0xfb,
];

describe('Test IPV4 Payload within a MDNS Packet', () => {
  it('always returns 4 for the version', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).version).toBe(4);
  });

  it('always returns 4 for the version', () => {
    const [, ...ipv4WithoutVersion] = ipv4PayloadMock;
    const alteredBuffer = [0x55, ...ipv4WithoutVersion];
    expect(() => ipv4(Buffer.from(alteredBuffer))).toThrowError(
      'Invalid IPV4 payload. Version bits must equal 4. Version found 5.',
    );
  });

  it('always returns the header length of the payload.', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).headerLength).toBe(20);
  });

  describe('Differentiated Services Field', () => {
    it('reads the first 6 bits of the field and converts it to Differentiated Services Code Point (DSCP)', () => {
      const buffer = Buffer.from(ipv4PayloadMock);
      expect(+ipv4(Buffer.from(ipv4PayloadMock)).dcsp).toBe(
        Number.parseInt(`0b${buffer.readUInt8(1).toString(2).slice(0, 6)}`, 2),
      );
    });

    it('returns CS0 (Default) for DSCP', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.dcsp?.name).toBe('CS0');
    });

    it('reads the remaining 2 bits of the field and converts it to Explicit Congestion Notification (ECN)', () => {
      const buffer = Buffer.from(ipv4PayloadMock);
      expect(+ipv4(Buffer.from(ipv4PayloadMock)).ecn).toBe(
        Number.parseInt(`0b${buffer.readUInt8(1).toString(2).slice(-2)}`, 2),
      );
    });

    it('returns Not ECN-capable for ECN', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.ecn?.name).toBe('Not ECN-capable');
    });
  });

  it('reads the length off of the 3rd and 4th bytes of the frame payload', () => {
    const buffer = Buffer.from(ipv4PayloadMock);
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).length).toBe(buffer.readUInt16BE(2));
  });

  it('returns the length of the payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).length).toBe(1239);
  });

  it('reads the identification off of the 5th and 6th bytes of the frame payload', () => {
    const buffer = Buffer.from(ipv4PayloadMock);
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).identification).toBe(buffer.readUInt16BE(4));
  });

  it('returns the length of the payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).identification.hex).toBe('0x0065');
  });

  describe('Flags', () => {
    it('returns the flag number as a binary of 3 bits', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).flags.binary).toBe('0b000');
    });

    it('returns zero for the reserved bit', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.flags?.reserved).toBe(0);
    });

    it('returns false for the "Don\'t Fragment" flag', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.flags?.DF).toBe(false);
    });

    it('returns false for the "More Fragment" flag', () => {
      expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.flags?.DF).toBe(false);
    });
  });

  it('reads the time to live (TTL) off of the 9th byet of the frame payload', () => {
    const buffer = Buffer.from(ipv4PayloadMock);
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).ttl).toBe(buffer.readUInt8(8));
  });

  it('returns time to live of the payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).ttl).toBe(0xff);
  });

  it('reads the protocol off of the 10th byet of the frame payload', () => {
    const buffer = Buffer.from(ipv4PayloadMock);
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).protocol).toBe(buffer.readUInt8(9));
  });

  it('returns protocol of the payload payload', () => {
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).protocol).toBe(0x11);
  });
  it('returns protocol name of the payload payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).details?.protocol?.name).toBe('UDP');
  });

  it('reads the header checksum of the 11th and 12th bytes of the frame payload', () => {
    const buffer = Buffer.from(ipv4PayloadMock);
    expect(+ipv4(Buffer.from(ipv4PayloadMock)).checksum).toBe(buffer.readUInt16BE(10));
  });

  it('returns the checksum of the payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).checksum.hex).toBe('0x4c0d');
  });

  it('returns the source ip from payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).sourceIP).toBe('10.64.127.104');
  });

  it('returns the destination ip from payload', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock)).destinationIP).toBe('224.0.0.251');
  });

  it('hides the details if options is provided', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { details: false } }).details).toBeUndefined();
  });

  it('hides the bytes if options is provided', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { bytes: false } }).bytes).toBeUndefined();
  });

  it('hides the bytePosition if options is provided', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { bytePosition: false } }).bytePosition).toBeUndefined();
  });

  it('hides the buffer if options is provided', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { buffer: false } }).buffer).toBeUndefined();
  });

  it('hides the readingBuffer if options is provided', () => {
    expect(
      ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { readingBuffer: false } }).readingBuffer,
    ).toBeUndefined();
  });

  it('hides the version if options is provided', () => {
    expect(ipv4(Buffer.from(ipv4PayloadMock), { payloadFields: { version: false } }).version).toBeUndefined();
  });
});
