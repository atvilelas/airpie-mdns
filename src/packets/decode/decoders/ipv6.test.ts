import { ipv6 } from './ipv6';

const ipv6PayloadMock: number[] = [
  0x60, 0x00, 0x01, 0x00, 0x05, 0x17, 0x11, 0xff, 0xfe, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x0c, 0x72,
  0xb6, 0x3a, 0x9d, 0x78, 0x35, 0xff, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0xfb,
];

describe('Test IPV6 Payload within a MDNS Packet', () => {
  it('always returns 6 for the version', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock)).version).toBe(6);
  });

  it('always returns 6 for the version', () => {
    const [, ...ipv6WithoutVersion] = ipv6PayloadMock;
    const alteredBuffer = [0x55, ...ipv6WithoutVersion];
    expect(() => ipv6(Buffer.from(alteredBuffer))).toThrowError(
      'Invalid IPV6 payload. Version bits must equal 6. Version found 5.',
    );
  });

  describe('Differentiated Services Field', () => {
    it('reads the first 6 bits of the field and converts it to Differentiated Services Code Point (DSCP)', () => {
      const buffer = Buffer.from(ipv6PayloadMock);
      expect(+ipv6(Buffer.from(ipv6PayloadMock)).dcsp).toBe(
        Number.parseInt(`0b${buffer.readUInt8(1).toString(2).slice(0, 6)}`, 2),
      );
    });

    it('returns CS0 (Default) for DSCP', () => {
      expect(ipv6(Buffer.from(ipv6PayloadMock)).details?.dcsp?.name).toBe('CS0');
    });

    it('reads the remaining 2 bits of the field and converts it to Explicit Congestion Notification (ECN)', () => {
      const buffer = Buffer.from(ipv6PayloadMock);
      expect(+ipv6(Buffer.from(ipv6PayloadMock)).ecn).toBe(
        Number.parseInt(`0b${buffer.readUInt8(1).toString(2).slice(-2)}`, 2),
      );
    });

    it('returns Not ECN-capable for ECN', () => {
      expect(ipv6(Buffer.from(ipv6PayloadMock)).details?.ecn?.name).toBe('Not ECN-capable');
    });
  });

  it('reads the length off of the 5rd and 6th bytes of the frame payload', () => {
    const buffer = Buffer.from(ipv6PayloadMock);
    expect(+ipv6(Buffer.from(ipv6PayloadMock)).length).toBe(buffer.readUInt16BE(4));
  });

  it('returns the length of the payload', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock)).length).toBe(1303);
  });

  it('reads next header protocol off of the 7th byte of the frame payload', () => {
    const buffer = Buffer.from(ipv6PayloadMock);
    expect(+ipv6(Buffer.from(ipv6PayloadMock)).protocol).toBe(buffer.readUInt8(6));
  });

  it('returns protocol of the payload payload', () => {
    expect(+ipv6(Buffer.from(ipv6PayloadMock)).protocol).toBe(0x11);
  });
  it('returns protocol name of the payload payload', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock)).details?.protocol?.name).toBe('UDP');
  });

  it('reads the hop limit from the 8th byte', () => {
    const buffer = Buffer.from(ipv6PayloadMock);
    expect(+ipv6(Buffer.from(ipv6PayloadMock)).hopLimit).toBe(buffer.readUInt8(7));
  });

  it('returns the source ip from payload', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock)).sourceIP).toBe('fe80::1c0c:72b6:3a9d:7835');
  });

  it('returns the destination ip from payload', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock)).destinationIP).toBe('ff02::00fb');
  });

  it('hides the details if options is provided', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { details: false } }).details).toBeUndefined();
  });

  it('hides the bytes if options is provided', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { bytes: false } }).bytes).toBeUndefined();
  });

  it('hides the bytePosition if options is provided', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { bytePosition: false } }).bytePosition).toBeUndefined();
  });

  it('hides the buffer if options is provided', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { buffer: false } }).buffer).toBeUndefined();
  });

  it('hides the readingBuffer if options is provided', () => {
    expect(
      ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { readingBuffer: false } }).readingBuffer,
    ).toBeUndefined();
  });

  it('hides the version if options is provided', () => {
    expect(ipv6(Buffer.from(ipv6PayloadMock), { payloadFields: { version: false } }).version).toBeUndefined();
  });
});
