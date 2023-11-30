import { NoNetworkError, getScannableNetworkInterfaces } from '@airpie/common-network';
import { NetworkInterface } from '@airpie/common-network/types';

import { store } from './store';

export const getAllNetworkInterfaces = (skipCache?: boolean): NetworkInterface[] => {
  const cachedNetworkInterfaces = store.getStateEntry('networkInterfaces');
  if (cachedNetworkInterfaces && cachedNetworkInterfaces.length > 0 && !skipCache) {
    return cachedNetworkInterfaces;
  }
  const scannableInterfaces = getScannableNetworkInterfaces();
  if (scannableInterfaces && scannableInterfaces.length > 0) {
    store.setStateEntry('networkInterfaces', scannableInterfaces);
    return scannableInterfaces;
  }

  throw new NoNetworkError(new Error('Unable to find network interface with valid network to be scanned.'));
};
