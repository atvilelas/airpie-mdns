import { ptr } from './ptr';

const multipleResourceRecordMockPayload = [
  0x00, 0x00, 0x84, 0x00, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x08, 0x15, 0x61, 0x62, 0x73, 0x6f, 0x6c, 0x75,
  0x74, 0x65, 0x73, 0x20, 0x66, 0x6f, 0x75, 0x6e, 0x64, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x08, 0x5f, 0x61, 0x69,
  0x72, 0x70, 0x6c, 0x61, 0x79, 0x04, 0x5f, 0x74, 0x63, 0x70, 0x05, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x00, 0x00, 0x10,
  0x80, 0x01, 0x00, 0x00, 0x11, 0x94, 0x01, 0x6b, 0x05, 0x61, 0x63, 0x74, 0x3d, 0x32, 0x05, 0x61, 0x63, 0x6c, 0x3d,
  0x30, 0x1a, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x69, 0x64, 0x3d, 0x41, 0x38, 0x3a, 0x38, 0x46, 0x3a, 0x44, 0x39,
  0x3a, 0x35, 0x39, 0x3a, 0x44, 0x38, 0x3a, 0x46, 0x42, 0x13, 0x66, 0x65, 0x78, 0x3d, 0x31, 0x63, 0x39, 0x2f, 0x53,
  0x74, 0x35, 0x50, 0x46, 0x37, 0x67, 0x32, 0x49, 0x51, 0x51, 0x1e, 0x66, 0x65, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73,
  0x3d, 0x30, 0x78, 0x34, 0x41, 0x37, 0x46, 0x43, 0x46, 0x44, 0x35, 0x2c, 0x30, 0x78, 0x42, 0x38, 0x31, 0x37, 0x34,
  0x46, 0x44, 0x45, 0x07, 0x72, 0x73, 0x66, 0x3d, 0x30, 0x78, 0x38, 0x0b, 0x66, 0x6c, 0x61, 0x67, 0x73, 0x3d, 0x30,
  0x78, 0x32, 0x30, 0x34, 0x28, 0x67, 0x69, 0x64, 0x3d, 0x38, 0x43, 0x45, 0x37, 0x37, 0x46, 0x34, 0x31, 0x2d, 0x32,
  0x31, 0x35, 0x31, 0x2d, 0x34, 0x37, 0x37, 0x39, 0x2d, 0x39, 0x46, 0x32, 0x37, 0x2d, 0x37, 0x41, 0x32, 0x36, 0x30,
  0x31, 0x33, 0x41, 0x43, 0x42, 0x34, 0x34, 0x05, 0x69, 0x67, 0x6c, 0x3d, 0x30, 0x06, 0x67, 0x63, 0x67, 0x6c, 0x3d,
  0x30, 0x0d, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x3d, 0x4d, 0x61, 0x63, 0x31, 0x34, 0x2c, 0x32, 0x04, 0x61, 0x74, 0x3d,
  0x34, 0x0d, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x76, 0x65, 0x72, 0x73, 0x3d, 0x31, 0x2e, 0x31, 0x27, 0x70, 0x69, 0x3d,
  0x64, 0x61, 0x31, 0x39, 0x30, 0x62, 0x61, 0x61, 0x2d, 0x39, 0x64, 0x63, 0x64, 0x2d, 0x34, 0x31, 0x31, 0x31, 0x2d,
  0x62, 0x61, 0x64, 0x33, 0x2d, 0x31, 0x34, 0x64, 0x64, 0x30, 0x37, 0x34, 0x63, 0x32, 0x38, 0x34, 0x36, 0x28, 0x70,
  0x73, 0x69, 0x3d, 0x46, 0x31, 0x44, 0x46, 0x35, 0x36, 0x31, 0x35, 0x2d, 0x32, 0x32, 0x44, 0x37, 0x2d, 0x34, 0x30,
  0x38, 0x34, 0x2d, 0x38, 0x44, 0x44, 0x35, 0x2d, 0x43, 0x46, 0x30, 0x41, 0x45, 0x32, 0x35, 0x30, 0x34, 0x35, 0x42,
  0x37, 0x43, 0x70, 0x6b, 0x3d, 0x66, 0x32, 0x34, 0x36, 0x32, 0x35, 0x61, 0x65, 0x35, 0x65, 0x37, 0x30, 0x36, 0x34,
  0x65, 0x37, 0x37, 0x30, 0x35, 0x31, 0x36, 0x66, 0x66, 0x39, 0x61, 0x32, 0x33, 0x64, 0x61, 0x65, 0x33, 0x39, 0x61,
  0x38, 0x61, 0x35, 0x61, 0x63, 0x38, 0x36, 0x31, 0x36, 0x32, 0x30, 0x37, 0x32, 0x66, 0x65, 0x36, 0x31, 0x63, 0x30,
  0x61, 0x65, 0x34, 0x35, 0x30, 0x38, 0x31, 0x62, 0x66, 0x38, 0x39, 0x34, 0x10, 0x73, 0x72, 0x63, 0x76, 0x65, 0x72,
  0x73, 0x3d, 0x37, 0x35, 0x30, 0x2e, 0x31, 0x31, 0x2e, 0x32, 0x09, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
  0x73, 0x07, 0x5f, 0x64, 0x6e, 0x73, 0x2d, 0x73, 0x64, 0x04, 0x5f, 0x75, 0x64, 0x70, 0xc0, 0x30, 0x00, 0x0c, 0x00,
  0x01, 0x00, 0x00, 0x11, 0x94, 0x00, 0x02, 0xc0, 0x22, 0xc0, 0x22, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x94,
  0x00, 0x02, 0xc0, 0x0c,
];

const hostName = '_services._dns-sd._udp';
const domain = 'local';
describe('Record Resource PTR  tests', () => {
  it('reads the name resource record name', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    const decodedPTR = ptr(buffer, { offset: 428, frameOffset: 0 });
    expect(decodedPTR.domainName).toBe(`${hostName}.${domain}`);
  });

  it('reads the partial name resource record name', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    const decodedPTR = ptr(buffer, { offset: 428, frameOffset: -1 });
    expect(decodedPTR.domainName).toBe(`${hostName}`);
  });

  it('throws an error if the pointer is wrong or lenght is 0', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    expect(() => ptr(buffer)).toThrow('Wrong name or pointer. Empty labels.');
  });
});
