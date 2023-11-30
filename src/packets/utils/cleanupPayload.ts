export const cleanupPayload = <T extends object>(payload: T, fields?: { [key in keyof T]?: boolean }): T => {
  const cleaningFields = { ...(fields || {}), buffer: false, readingBuffer: false };
  if (!cleaningFields) {
    return payload;
  }
  const payloadCopy = { ...payload };

  Object.entries<boolean | undefined>(cleaningFields).forEach((entry: [string, boolean | undefined]) => {
    const [field, include] = entry;
    if (!include) {
      delete payloadCopy[field as keyof T];
    }
  });

  return payloadCopy;
};
