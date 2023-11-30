import { header as decodeHeader } from '../mdns/packets/decode';
import { list as decodeList } from '../mdns/packets/decode/decoders/list';
import { Answer, DecodedPacket, MDNS_RESOURCE_RECORDS_TYPES, Question } from '../mdns/packets/types';

export const decodeMDNSPacket = (packet: Buffer): DecodedPacket => {
  const mdnsHeader = decodeHeader(packet, {
    offset: 0,
  });

  const questionList = decodeList<Question>(packet, {
    offset: mdnsHeader.bytes,
    frameOffset: 0,
    count: mdnsHeader.questions,
    type: MDNS_RESOURCE_RECORDS_TYPES.QUESTION,
  });

  const answerList = decodeList<Answer>(packet, {
    offset: mdnsHeader.bytes + questionList.bytes,
    frameOffset: 0,
    count: mdnsHeader.answerResourceRecords,
    type: MDNS_RESOURCE_RECORDS_TYPES.ANSWER,
  });

  const authorityList = decodeList<Answer>(packet, {
    offset: mdnsHeader.bytes + questionList.bytes + answerList.bytes,
    frameOffset: 0,
    count: mdnsHeader.authorityResourceRecords,
    type: MDNS_RESOURCE_RECORDS_TYPES.ANSWER,
  });

  const additionalList = decodeList<Answer>(packet, {
    offset: +mdnsHeader.bytes + questionList.bytes + answerList.bytes + authorityList.bytes,
    frameOffset: 0,
    count: mdnsHeader.additionalResourceRecords,
    type: MDNS_RESOURCE_RECORDS_TYPES.ANSWER,
  });

  return {
    header: mdnsHeader,
    questions: questionList,
    answers: answerList,
    authorities: authorityList,
    additionals: additionalList,
  };
};
