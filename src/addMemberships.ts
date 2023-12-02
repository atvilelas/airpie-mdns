import { MULTICAST_ADDRESS } from './constants';

import { getAllNetworkInterfaces } from './getAllNetworkInterfaces';
import { getSocket } from './getSocket';

export const addMemberships = () => {
  const networkInterfaces = getAllNetworkInterfaces();
  const socket = getSocket();
  networkInterfaces.forEach((networkInterface) => {
    try {
      socket.addMembership(MULTICAST_ADDRESS, networkInterface.address);
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}.\n<${networkInterface.family}:${networkInterface.address}>`);
    }
  });
};
