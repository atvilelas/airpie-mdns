export const name = (data: string): Buffer => {
  let length = Buffer.byteLength(data.replace(/^\.|\.$/gm, '')) + 2;
  if (data === '.' || data === '..') {
    length = 1;
  }

  const encodingBuffer = Buffer.alloc(length);
  let encodingOffset = 0;
  const normalizedName = data.replace(/^\.|\.$/gm, '');
  normalizedName.split('.').forEach((item) => {
    const listLength = encodingBuffer.write(item, encodingOffset + 1);
    encodingBuffer[encodingOffset] = listLength;
    encodingOffset += listLength + 1;
  });

  encodingOffset++;
  encodingBuffer[encodingOffset] = 0;

  return encodingBuffer;
};
