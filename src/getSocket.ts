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
    throw new Error(`${(error as Error).message}.\nError while trying to create a socket.`);
  }

  throw new Error('Socket not found');
};
