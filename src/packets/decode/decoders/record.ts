import { MDNS_RECORD_TYPES, Decoder, Packet, ResourceRecords } from '../types';
import { a } from './a';
import { aaaa } from './aaaa';
import { nsec } from './nsec';
import { ptr } from './ptr';
import { RawFactory } from './raw';
import { srv } from './srv';
import { txt } from './txt';

export const record = (type: MDNS_RECORD_TYPES): Decoder<Packet<ResourceRecords>> => {
  switch (type) {
    case MDNS_RECORD_TYPES.A:
      return a;
    case MDNS_RECORD_TYPES.PTR:
      return ptr;
    case MDNS_RECORD_TYPES.TXT:
      return txt;
    case MDNS_RECORD_TYPES.AAAA:
      return aaaa;
    case MDNS_RECORD_TYPES.SRV:
      return srv;
    case MDNS_RECORD_TYPES.NSEC:
      return nsec;
    default:
      {
        console.log('Type not implemented.', MDNS_RECORD_TYPES[type] || type);
        return RawFactory(type);
      }
      break;
  }
};
