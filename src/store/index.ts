import { getStore } from '@store';
import { MDNSState } from './types';

export const store = getStore<MDNSState>('@mdns');
