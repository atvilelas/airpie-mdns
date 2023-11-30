import { MULTICAST_ADDRESS } from './constants';
import { SocketAddMemberError } from './errors';
import { getAllNetworkInterfaces } from './getAllNetworkInterfaces';
import { getSocket } from './getSocket';

export const addMemberships = () => {
  const networkInterfaces = getAllNetworkInterfaces();
  const socket = getSocket();
  networkInterfaces.forEach((networkInterface) => {
    try {
      socket.addMembership(MULTICAST_ADDRESS, networkInterface.address);
    } catch (error) {
      throw new SocketAddMemberError(`<${networkInterface.family}:${networkInterface.address}>`, error as Error);
    }
  });
};
