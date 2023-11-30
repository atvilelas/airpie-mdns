import { EnhancedError } from '@errors';
import { ErrorCodes, SOCKET_ERRORS } from './types';

export class CreateSocketError extends EnhancedError<ErrorCodes> {
  constructor(errorStack?: Error) {
    super('Failed creating UDP socket', errorStack);
  }

  get code() {
    return SOCKET_ERRORS.CREATE_FAILED as ErrorCodes;
  }
}

export class GetSocketError extends EnhancedError<ErrorCodes> {
  constructor(errorStack?: Error) {
    super('Unknown error while creating/retrieving UPD socket', errorStack);
  }

  get code() {
    return SOCKET_ERRORS.GET_FAILED as ErrorCodes;
  }
}

export class SocketAddMemberError extends EnhancedError<ErrorCodes> {
  constructor(interfaceName: string, errorStack?: Error) {
    super(`Failed to add interface ${interfaceName} to socket`, errorStack);
  }

  get code() {
    return SOCKET_ERRORS.ADD_INTERFACE as ErrorCodes;
  }
}
