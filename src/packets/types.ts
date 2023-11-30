export * from './decode/types';
export * from './encode/types';

export enum MDNS_RESOURCE_RECORDS_TYPES {
  QUESTION = 'question',
  ANSWER = 'answer',
  AUTHORITY = 'authority',
  ADDITIONAL = 'additional',
}

export enum MDNS_RESOURCE_RECORDS_KEYS {
  question = 'questions',
  answer = 'answerResourceRecords',
  authority = 'authorityResourceRecords',
  additional = 'additionalResourceRecords',
}
