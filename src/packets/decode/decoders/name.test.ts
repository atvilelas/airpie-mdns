import { MDNS_HEADER_LENGTH } from '../../constants';
import { name } from './name';

const multipleResourceRecordMockPayload = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x08, 0x5f, 0x61, 0x69, 0x72, 0x70, 0x6c,
  0x61, 0x79, 0x04, 0x5f, 0x74, 0x63, 0x70, 0x05, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x00, 0x00, 0x0c, 0x00, 0x01, 0x05,
  0x5f, 0x72, 0x61, 0x6f, 0x70, 0xc0, 0x15, 0x00, 0x0c, 0x00, 0x01, 0xc0, 0x0c, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00,
  0x11, 0x8a, 0x00, 0x18, 0x15, 0x41, 0x6e, 0x64, 0x72, 0x65, 0xe2, 0x80, 0x99, 0x73, 0x20, 0x4d, 0x61, 0x63, 0x42,
  0x6f, 0x6f, 0x6b, 0x20, 0x41, 0x69, 0x72, 0xc0, 0x25, 0xc0, 0x0c, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x91,
  0x00, 0x0d, 0x0a, 0x47, 0x75, 0x65, 0x73, 0x74, 0x20, 0x52, 0x6f, 0x6f, 0x6d, 0xc0, 0x3d, 0xc0, 0x0c, 0x00, 0x0c,
  0x00, 0x01, 0x00, 0x00, 0x11, 0x91, 0x00, 0x0e, 0x0b, 0x4c, 0x69, 0x76, 0x69, 0x6e, 0x67, 0x20, 0x52, 0x6f, 0x6f,
  0x6d, 0xc0, 0x0c, 0xc0, 0x0c, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x91, 0x00, 0x11, 0x0e, 0x4d, 0x61, 0x73,
  0x74, 0x65, 0x72, 0x20, 0x62, 0x65, 0x64, 0x72, 0x6f, 0x6f, 0x6d, 0xc0, 0x0c, 0xc0, 0x25, 0x00, 0x0c, 0x00, 0x01,
  0x00, 0x00, 0x11, 0x8a, 0x00, 0x25, 0x22, 0x41, 0x38, 0x38, 0x46, 0x44, 0x39, 0x35, 0x39, 0x44, 0x38, 0x46, 0x42,
  0x40, 0x41, 0x6e, 0x64, 0x72, 0x65, 0xe2, 0x80, 0x99, 0x73, 0x20, 0x4d, 0x61, 0x63, 0x42, 0x6f, 0x6f, 0x6b, 0x20,
  0x41, 0x69, 0x72, 0xc0, 0x25, 0xc0, 0x25, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x91, 0x00, 0x1a, 0x17, 0x39,
  0x30, 0x44, 0x44, 0x35, 0x44, 0x45, 0x38, 0x33, 0x42, 0x41, 0x35, 0x40, 0x47, 0x75, 0x65, 0x73, 0x74, 0x20, 0x52,
  0x6f, 0x6f, 0x6d, 0xc0, 0x25, 0xc0, 0x25, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x91, 0x00, 0x1b, 0x18, 0x41,
  0x38, 0x35, 0x31, 0x41, 0x42, 0x31, 0x31, 0x30, 0x41, 0x30, 0x32, 0x40, 0x4c, 0x69, 0x76, 0x69, 0x6e, 0x67, 0x20,
  0x52, 0x6f, 0x6f, 0x6d, 0xc0, 0x25, 0xc0, 0x25, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x11, 0x91, 0x00, 0x1e, 0x1b,
  0x34, 0x30, 0x43, 0x42, 0x43, 0x30, 0x42, 0x34, 0x38, 0x46, 0x44, 0x46, 0x40, 0x4d, 0x61, 0x73, 0x74, 0x65, 0x72,
  0x20, 0x62, 0x65, 0x64, 0x72, 0x6f, 0x6f, 0x6d, 0xc0, 0x25, 0x00, 0x00, 0x29, 0x05, 0xa0, 0x00, 0x00, 0x11, 0x94,
  0x00, 0x12, 0x00, 0x04, 0x00, 0x0e, 0x00, 0xcb, 0x36, 0x75, 0x2e, 0x06, 0xf4, 0xa3, 0xa8, 0x8f, 0xd9, 0x59, 0xd8,
  0xfb,
];

const singleResourceRecordMockPayload = [
  0x08, 0x5f, 0x61, 0x69, 0x72, 0x70, 0x6c, 0x61, 0x79, 0x04, 0x5f, 0x74, 0x63, 0x70, 0x05, 0x6c, 0x6f, 0x63, 0x61,
  0x6c, 0x00, 0x00, 0x0c, 0x00, 0x01,
];

const completeNameExtraction = (buffer: Buffer) => {
  let mark = -1;
  let length = -1;
  let readingByte = 0;
  const separators = [];
  while (mark === -1) {
    length = buffer.readUInt8(readingByte);
    if (length === 0) {
      mark = readingByte + 1;
    }
    if ((length & 0xc0) === 0x0) {
      // if it's 0 it means it's a length of the next label/octet
      separators.push(readingByte);
      readingByte += length + 1;
    }

    if ((length & 0xc0) === 0xc0) {
      // if it's 0 it means it's a length of the next label/octet
      separators.push(readingByte);
      mark = readingByte;
    }
  }
  const extractedNameArray = buffer.subarray(0, mark).toString().split('');
  separators.forEach((index) => {
    extractedNameArray[index] = '.';
  });
  return extractedNameArray.slice(1, -1).join('');
};
describe('MDNS Name tests', () => {
  it('reads the name resource record name', () => {
    const buffer = Buffer.from(singleResourceRecordMockPayload);
    const decodedName = name(Buffer.from(singleResourceRecordMockPayload));
    expect(completeNameExtraction(buffer)).toBe(decodedName.value);
  });
  it('throws an error if the offset requested is beyond the buffer', () => {
    const buffer = Buffer.from(singleResourceRecordMockPayload);
    expect(() => name(buffer, { offset: 600 })).toThrowError("Buffer overflow. Can't read 600 of 25");
  });

  it('throws an error if the label length is beyond the buffer size', () => {
    const buffer = Buffer.from(singleResourceRecordMockPayload).subarray(0, 15);

    expect(() => name(buffer)).toThrowError("Buffer overflow. Can't read 20 of 15");
  });

  it('throws an error if the name is invalid', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    const firstBufferLengthPosition = 1;
    buffer.writeUInt8(0xbf, 0);
    const firstLabelLength = buffer.readUint8(0);
    buffer.writeUInt8(0xbf, MDNS_HEADER_LENGTH + firstBufferLengthPosition + firstLabelLength);
    expect(() => name(buffer)).toThrowError('Invalid name.');
  });

  it('throws an error if the total lenght exceeds 254', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    const length = 0x3f;
    const shift = length + 1;
    buffer.writeUInt8(0x3f, MDNS_HEADER_LENGTH);
    buffer.writeUInt8(0x3f, MDNS_HEADER_LENGTH + shift);
    buffer.writeUInt8(0x3f, MDNS_HEADER_LENGTH + 2 * shift);
    buffer.writeUInt8(0x3f, MDNS_HEADER_LENGTH + 3 * shift);
    expect(() => name(buffer, { offset: MDNS_HEADER_LENGTH })).toThrowError(
      'Name too long. Name max size is 254, 256 read.',
    );
  });

  it('reads the data from previous record if there is a pointer value', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);
    const firstRecordLength = 25;
    expect(name(buffer, { offset: MDNS_HEADER_LENGTH + firstRecordLength, frameOffset: 0 }).complete).toBe(true);
  });

  it('throws an error if the pointer value is beyond buffer length', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload).subarray(0, 44);
    const firstRecordLength = 25;
    expect(
      () => name(buffer, { offset: MDNS_HEADER_LENGTH + firstRecordLength, frameOffset: 600 }).hasPointer,
    ).toThrowError(`Buffer overflow. Can't read 45 of 44`);
  });

  it('moves the cursor back in the right field if a pointer is found (incomplete name using part of another record to complete)', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);

    const readingRecordPosition = 37;
    const recordLength = buffer.readUInt8(readingRecordPosition) + 2;
    // Record lenght is in the first by of reading record, then passed that many bytes is the position for the shift.
    const shiftPosition = buffer.readUInt8(readingRecordPosition + 1 + buffer.readUInt8(readingRecordPosition) + 1);
    const partialNameLength = recordLength;
    const decodedName = name(buffer, { offset: readingRecordPosition, frameOffset: 0 });
    const partialName = completeNameExtraction(
      buffer.subarray(readingRecordPosition, readingRecordPosition + partialNameLength),
    );
    const restName = completeNameExtraction(buffer.subarray(shiftPosition));
    expect(decodedName.complete).toBe(true);
    expect(decodedName.hasPointer).toBe(true);
    expect(decodedName.value).toBe(`${partialName}.${restName}`);
  });

  it('returns a partial name if no frame offset is specified', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);

    const readingRecordPosition = 37;
    const recordLength = buffer.readUInt8(readingRecordPosition) + 2;
    const partialNameLength = recordLength;
    const decodedName = name(buffer, { offset: readingRecordPosition });
    const partialName = completeNameExtraction(
      buffer.subarray(readingRecordPosition, readingRecordPosition + partialNameLength),
    );
    expect(decodedName.hasPointer).toBe(true);
    expect(decodedName.complete).toBe(false);
    expect(decodedName.value).toBe(`${partialName}`);
  });

  it('throws an error if the pointer is placed beyond the buffer', () => {
    const readingRecordPosition = 37;
    const buffer = Buffer.from(multipleResourceRecordMockPayload).subarray(
      readingRecordPosition,
      readingRecordPosition + 10,
    );

    expect(() => name(buffer, { frameOffset: 0 })).toThrow(
      'Invalid name pointer. Reading offset is 0 point is trying to read 21 before that offset.',
    );
  });

  it('moves the cursor back (2x) in the right field if a pointer is found (incomplete name using part of another record to complete)', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);

    const readingRecordPosition = 61;
    const recordLength = buffer.readUInt8(readingRecordPosition) + 2;
    // Record lenght is in the first by of reading record, then passed that many bytes is the position for the shift.
    const partialNameLength = recordLength;
    const decodedName = name(buffer, { offset: readingRecordPosition, frameOffset: 0 });
    const partialName = completeNameExtraction(
      buffer.subarray(readingRecordPosition, readingRecordPosition + partialNameLength),
    );
    // First shift is at the end of the first label/octet
    const shiftPosition_001 = buffer.readUInt8(readingRecordPosition + 1 + buffer.readUInt8(readingRecordPosition) + 1);
    const restName_001 = completeNameExtraction(buffer.subarray(shiftPosition_001));
    // Second shift is at the end of the second label/octet - first in the shifted position
    const shiftPosition_002 = buffer.readUInt8(shiftPosition_001 + 1 + buffer.readUInt8(shiftPosition_001) + 1);
    const restName_002 = completeNameExtraction(buffer.subarray(shiftPosition_002));
    expect(decodedName.complete).toBe(true);
    expect(decodedName.hasPointer).toBe(true);
    expect(decodedName.value).toBe(`${partialName}.${restName_001}.${restName_002}`);
  });

  it('moves the cursor back (3x) in the right field if a pointer is found (incomplete name using part of another record to complete)', () => {
    const buffer = Buffer.from(multipleResourceRecordMockPayload);

    const readingRecordPosition = 97;
    const recordLength = buffer.readUInt8(readingRecordPosition) + 2;
    // Record lenght is in the first by of reading record, then passed that many bytes is the position for the shift.
    const partialNameLength = recordLength;
    const decodedName = name(buffer, { offset: readingRecordPosition, frameOffset: 0 });
    const partialName = completeNameExtraction(
      buffer.subarray(readingRecordPosition, readingRecordPosition + partialNameLength),
    );
    // First shift is at the end of the first label/octet
    const shiftPosition_001 = buffer.readUInt8(readingRecordPosition + 1 + buffer.readUInt8(readingRecordPosition) + 1);
    const restName_001 = completeNameExtraction(buffer.subarray(shiftPosition_001));
    // Second shift is at the end of the second label/octet - first in the shifted position
    const shiftPosition_002 = buffer.readUInt8(shiftPosition_001 + 1 + buffer.readUInt8(shiftPosition_001) + 1);
    const restName_002 = completeNameExtraction(buffer.subarray(shiftPosition_002));

    const shiftPosition_003 = buffer.readUInt8(shiftPosition_002 + 1 + buffer.readUInt8(shiftPosition_002) + 1);
    const restName_003 = completeNameExtraction(buffer.subarray(shiftPosition_003));

    expect(decodedName.complete).toBe(true);
    expect(decodedName.hasPointer).toBe(true);
    expect(decodedName.value).toBe(`${partialName}.${restName_001}.${restName_002}.${restName_003}`);
  });
});
