import { CreateSocketError, GetSocketError } from './errors';
import { store } from './store';
import dgram, { Socket } from 'dgram';

export const getSocket = (skipCache?: boolean): Socket => {
  try {
    const cachedSocket = store.getStateEntry('socket');
    if (cachedSocket && !skipCache) {
      return cachedSocket;
    }

    const newSocket = dgram.createSocket({
      type: 'udp4',
      reuseAddr: true,
    });

    if (newSocket) {
      store.setStateEntry('socket', newSocket);
      return newSocket;
    }
  } catch (error) {
    throw new CreateSocketError(error as Error);
  }

  throw new GetSocketError(new Error('Socket not found'));
};
