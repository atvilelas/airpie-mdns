import { EnhancedError } from '@errors';
import { ErrorCodes, DECODE_ERRORS } from './types';

export class PacketSizeHeaderDecodeError extends EnhancedError<ErrorCodes> {
  constructor(packetSize: number) {
    super(`Packet size must be at least 12 bytes. ${packetSize} provided.`, new Error('Failed to decode header.'));
  }

  get code() {
    return DECODE_ERRORS.HEADER_SIZE as ErrorCodes;
  }
}

export class DecodeNameOverflowError extends EnhancedError<ErrorCodes> {
  constructor({ offset, size }: { offset: number; size: number }) {
    super(`Buffer overflow. Can't read ${offset} of ${size}`, new Error('Failed to decode name.'));
  }

  get code() {
    return DECODE_ERRORS.HEADER_SIZE as ErrorCodes;
  }
}

export class DecodeNameTooLongError extends EnhancedError<ErrorCodes> {
  constructor(size: number) {
    super(`Name too long. Name max size is 254, ${size} read.`, new Error('Failed to decode name.'));
  }

  get code() {
    return DECODE_ERRORS.NAME_TOO_LONG as ErrorCodes;
  }
}

export class DecodeNameInvalidPointerError extends EnhancedError<ErrorCodes> {
  constructor({ pos, offset }: { pos: number; offset: number }) {
    super(
      `Invalid name pointer. Reading offset is ${offset} point is trying to read ${pos} before that offset.`,
      new Error('Failed to decode name.'),
    );
  }

  get code() {
    return DECODE_ERRORS.INVALID_POINTER as ErrorCodes;
  }
}

export class DecodeNameInvalidNameError extends EnhancedError<ErrorCodes> {
  constructor() {
    super(`Invalid name.`, new Error('Failed to decode name.'));
  }

  get code() {
    return DECODE_ERRORS.INVALID_NAME as ErrorCodes;
  }
}
