import { getStore } from '@airpie/common-store';
import { MDNSState } from './types';

export const store = getStore<MDNSState>('@mdns');
