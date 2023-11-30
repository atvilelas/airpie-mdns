import { SAFETY_DELAY } from './constants';
import { events } from './events';
import { store } from './store';
import { MDNS_EVENTS } from './events/types';
import { RemoteInfo } from 'dgram';
import { getSocket } from './getSocket';
import { addMemberships } from './addMemberships';
import { incomingPacket } from './incomingPacket';
// import { handleReceivedPacket } from './handlers/receivePacket';

export const start = () => {
  try {
    if (store.getStateEntry('connected')) {
      return;
    }
    const socket = getSocket();
    socket.on('error', (error: Error) => {
      store.setStateEntry('connected', false);
      store.setStateEntry('errors', (state) => {
        const newState = { ...state };
        newState.errors.errors.push(error);
        newState.errors.lastErrorTime = new Date();
        newState.errors.lastError = newState.errors.errors[newState.errors.errors.length - 1];
        return newState;
      });
      return;
    });

    socket.on('listening', () => {
      socket.setMulticastLoopback(false);
      addMemberships();
      store.setStateEntry('connected', true);
      setTimeout(() => {
        events.emit(MDNS_EVENTS.LISTENING);
      }, SAFETY_DELAY);
    });

    socket.on('message', (buffer: Buffer, remoteInfo: RemoteInfo) => {
      incomingPacket(buffer, remoteInfo);
    });

    socket.bind(Math.floor(Math.random() * (65535 - 49152) + 49152), () => {
      socket.removeAllListeners('error');
    });
  } catch (error) {
    console.log(error);
  }
};

export const send = (packet: Buffer): Promise<Buffer> => {
  try {
    let resolver: (value: Buffer) => void, rejector: (reason: Error) => void;
    const promise = new Promise<Buffer>((resolve, reject) => {
      resolver = resolve;
      rejector = reject;
    });

    const socket = getSocket();
    socket.send(packet, 5353, '224.0.0.251', (error) => {
      if (!error) {
        resolver(packet);
      } else {
        rejector(error);
      }
    });

    return promise;
  } catch (ex) {
    return Promise.reject(ex);
  }
};
