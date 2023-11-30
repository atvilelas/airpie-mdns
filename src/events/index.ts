import { eventSetter } from '@airpie/common-events';
import { MDNSState } from '../store/types';
import { store } from '../store';

const MDNS_GLOBAL_EVENT = '@mdns:global';

const getEvents = () => {
  return eventSetter<MDNSState>(MDNS_GLOBAL_EVENT)(store, 'events');
};

export const events = getEvents();
