import { NetworkInterface } from '@airpie/common-network';
import { Socket } from 'dgram';
import EventEmitter from 'events';

export type MDNSState = {
  networkInterfaces: NetworkInterface[];
  socket: Socket;
  connected?: boolean;
  events: EventEmitter;
  errors: {
    lastError: Error;
    lastErrorTime: Date;
    errors: Error[];
  };
};
