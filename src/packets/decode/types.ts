import { MacVendor } from '@airpie/common-network';
import { Numeral } from '@airpie/common-misc';
import { MDNS_RESOURCE_RECORDS_TYPES } from '../types';

export enum MDNS_RECORD_TYPES {
  'A' = 1,
  'NS' = 2,
  'MD' = 3,
  'MF' = 4,
  'CNAME' = 5,
  'SOA' = 6,
  'MB' = 7,
  'MG' = 8,
  'MR' = 9,
  'NULL' = 10,
  'WKS' = 11,
  'PTR' = 12,
  'HINFO' = 13,
  'MINFO' = 14,
  'MX' = 15,
  'TXT' = 16,
  'AAAA' = 28,
  'AFSDB' = 18,
  'APL' = 42,
  'CAA' = 257,
  'CDNSKEY' = 60,
  'CDS' = 59,
  'CERT' = 37,
  'DHCID' = 49,
  'DLV' = 32769,
  'DNAME' = 39,
  'DNSKEY' = 48,
  'DS' = 43,
  'HIP' = 55,
  'IPSECKEY' = 45,
  'KEY' = 25,
  'KX' = 36,
  'LOC' = 29,
  'NAPTR' = 35,
  'NSEC' = 47,
  'NSEC3' = 50,
  'NSEC3PARAM' = 51,
  'OPENPGPKEY' = 61,
  'RRSIG' = 46,
  'RP' = 17,
  'SIG' = 24,
  'SRV' = 33,
  'SSHFP' = 44,
  'TA' = 32768,
  'TKEY' = 249,
  'TLSA' = 52,
  'TSIG' = 250,
  'URI' = 256,
  'OPT' = 41,
  '*' = 255,
  'UNKNOWN' = 0xffff,
}

export enum MDNS_QUESTION_CLASSES {
  'IN' = 1,
  'CS' = 2,
  'CH' = 3,
  'HS' = 4,
}

export enum RESOURCE_RECORD_OPT_CODES {
  'OPTION_0' = 0,
  'LLQ' = 1,
  'UL' = 2,
  'NSID' = 3,
  'OWNER' = 4,
  'DAU' = 5,
  'DHU' = 6,
  'N3U' = 7,
  'CLIENT_SUBNET' = 8,
  'EXPIRE' = 9,
  'COOKIE' = 10,
  'TCP_KEEPALIVE' = 11,
  'PADDING' = 12,
  'CHAIN' = 13,
  'KEY_TAG' = 14,
  'DEVICEID' = 26946,
  'OPTION_65535' = 65535,
}
export enum ETHERNET_TYPES {
  'Internet Protocol version 4 (IPv4)' = 0x0800,
  'Address Resolution Protocol (ARP)' = 0x0806,
  'Wake-on-LAN[8]' = 0x0842,
  'Stream Reservation Protocol' = 0x22ea,
  'Audio Video Transport Protocol (AVTP)' = 0x22f0,
  'IETF TRILL Protocol' = 0x22f3,
  'DEC MOP RC' = 0x6002,
  'DECnet Phase IV, DNA Routing' = 0x6003,
  'DEC LAT' = 0x6004,
  'Reverse Address Resolution Protocol (RARP)' = 0x8035,
  'AppleTalk (Ethertalk)' = 0x809b,
  'AppleTalk Address Resolution Protocol (AARP)' = 0x80f3,
  'VLAN-tagged frame (IEEE 802.1Q) and Shortest Path Bridging IEEE 802.1aq with NNI compatibility[9]' = 0x8100,
  'Simple Loop Prevention Protocol (SLPP)' = 0x8102,
  'Virtual Link Aggregation Control Protocol (VLACP)' = 0x8103,
  'IPX' = 0x8137,
  'QNX Qnet' = 0x8204,
  'Internet Protocol Version 6 (IPv6)' = 0x86dd,
  'Ethernet flow control' = 0x8808,
  'Ethernet Slow Protocols[10] such as the Link Aggregation Control Protocol (LACP)' = 0x8809,
  'CobraNet' = 0x8819,
  'MPLS unicast' = 0x8847,
  'MPLS multicast' = 0x8848,
  'PPPoE Discovery Stage' = 0x8863,
  'PPPoE Session Stage' = 0x8864,
  'HomePlug 1.0 MME' = 0x887b,
  'EAP over LAN (IEEE 802.1X)' = 0x888e,
  'PROFINET Protocol' = 0x8892,
  'HyperSCSI (SCSI over Ethernet)' = 0x889a,
  'ATA over Ethernet' = 0x88a2,
  'EtherCAT Protocol' = 0x88a4,
  'Service VLAN tag identifier (S-Tag) on Q-in-Q tunnel' = 0x88a8,
  'Ethernet Powerlink[citation needed]' = 0x88ab,
  'GOOSE (Generic Object Oriented Substation event)' = 0x88b8,
  'GSE (Generic Substation Events) Management Services' = 0x88b9,
  'SV (Sampled Value Transmission)' = 0x88ba,
  'MikroTik RoMON (unofficial)' = 0x88bf,
  'Link Layer Discovery Protocol (LLDP)' = 0x88cc,
  'SERCOS III' = 0x88cd,
  'HomePlug Green PHY' = 0x88e1,
  'Media Redundancy Protocol (IEC62439-2)' = 0x88e3,
  'IEEE 802.1AE MAC security (MACsec)' = 0x88e5,
  'Provider Backbone Bridges (PBB) (IEEE 802.1ah)' = 0x88e7,
  'Precision Time Protocol (PTP) over IEEE 802.3 Ethernet' = 0x88f7,
  'NC-SI' = 0x88f8,
  'Parallel Redundancy Protocol (PRP)' = 0x88fb,
  'IEEE 802.1ag Connectivity Fault Management (CFM) Protocol / ITU-T Recommendation Y.1731 (OAM)' = 0x8902,
  'Fibre Channel over Ethernet (FCoE)' = 0x8906,
  'FCoE Initialization Protocol' = 0x8914,
  'RDMA over Converged Ethernet (RoCE)' = 0x8915,
  'TTEthernet Protocol Control Frame (TTE)' = 0x891d,
  '1905.1 IEEE Protocol' = 0x893a,
  'High-availability Seamless Redundancy (HSR)' = 0x892f,
  'Ethernet Configuration Testing Protocol[11]' = 0x9000,
  'Redundancy Tag (IEEE 802.1CB Frame Replication and Elimination for Reliability)' = 0xf1c1,
}

export enum ETHERNET_CAST_TYPE {
  'Unicast' = 0,
  'Multicast' = 1,
}

export enum ETHERNET_INDENTIFIER {
  'Globally Unique (OUI Enforced)' = 0,
  'Locally Administered' = 1,
}

export enum DCSP_VALUES {
  'CS0' = 0b000000,
  'CS1' = 0b001000,
  'AF11' = 0b001010,
  'AF12' = 0b001100,
  'AF13' = 0b001110,
  'CS2' = 0b010000,
  'AF21' = 0b010010,
  'AF22' = 0b010100,
  'AF23' = 0b010110,
  'CS3' = 0b011000,
  'AF31' = 0b011010,
  'AF32' = 0b011100,
  'AF33' = 0b011110,
  'CS4' = 0b100000,
  'AF41' = 0b100010,
  'AF42' = 0b100100,
  'AF43' = 0b100110,
  'CS5' = 0b101000,
  'EF' = 0b101110,
  'CS6' = 0b110000,
  'CS7' = 0b111000,
}

export enum ECN_VALUES {
  'Not ECN-capable' = 0b00,
  'ECN-capable end-hosts' = 0b01,
  'ENC-capable ned-hosts' = 0b10,
  'Congestion experienced' = 0b11,
}

export enum IP_PROTOCOLS {
  'HOPOPT' = 0x00,
  'ICMP' = 0x01,
  'IGMP' = 0x02,
  'GGP' = 0x03,
  'IP-in-IP' = 0x04,
  'ST' = 0x05,
  'TCP' = 0x06,
  'CBT' = 0x07,
  'EGP' = 0x08,
  'IGP' = 0x09,
  'BBN-RCC-MON' = 0x0a,
  'NVP-II' = 0x0b,
  'PUP' = 0x0c,
  'ARGUS' = 0x0d,
  'EMCON' = 0x0e,
  'XNET' = 0x0f,
  'CHAOS' = 0x10,
  'UDP' = 0x11,
  'MUX' = 0x12,
  'DCN-MEAS' = 0x13,
  'HMP' = 0x14,
  'PRM' = 0x15,
  'XNS-IDP' = 0x16,
  'TRUNK-1' = 0x17,
  'TRUNK-2' = 0x18,
  'LEAF-1' = 0x19,
  'LEAF-2' = 0x1a,
  'RDP' = 0x1b,
  'IRTP' = 0x1c,
  'ISO-TP4' = 0x1d,
  'NETBLT' = 0x1e,
  'MFE-NSP' = 0x1f,
  'MERIT-INP' = 0x20,
  'DCCP' = 0x21,
  '3PC' = 0x22,
  'IDPR' = 0x23,
  'XTP' = 0x24,
  'DDP' = 0x25,
  'IDPR-CMTP' = 0x26,
  'TP++' = 0x27,
  'IL' = 0x28,
  'IPv6' = 0x29,
  'SDRP' = 0x2a,
  'IPv6-Route' = 0x2b,
  'IPv6-Frag' = 0x2c,
  'IDRP' = 0x2d,
  'RSVP' = 0x2e,
  'GRE' = 0x2f,
  'DSR' = 0x30,
  'BNA' = 0x31,
  'ESP' = 0x32,
  'AH' = 0x33,
  'I-NLSP' = 0x34,
  'SwIPe' = 0x35,
  'NARP' = 0x36,
  'MOBILE' = 0x37,
  'TLSP' = 0x38,
  'SKIP' = 0x39,
  'IPv6-ICMP' = 0x3a,
  'IPv6-NoNxt' = 0x3b,
  'IPv6-Opts' = 0x3c,
  'EMPTY' = 0x72,
  'CFTP' = 0x3e,
  'SAT-EXPAK' = 0x40,
  'KRYPTOLAN' = 0x41,
  'RVD' = 0x42,
  'IPPC' = 0x43,
  'SAT-MON' = 0x45,
  'VISA' = 0x46,
  'IPCU' = 0x47,
  'CPNX' = 0x48,
  'CPHB' = 0x49,
  'WSN' = 0x4a,
  'PVP' = 0x4b,
  'BR-SAT-MON' = 0x4c,
  'SUN-ND' = 0x4d,
  'WB-MON' = 0x4e,
  'WB-EXPAK' = 0x4f,
  'ISO-IP' = 0x50,
  'VMTP' = 0x51,
  'SECURE-VMTP' = 0x52,
  'VINES' = 0x53,
  'TTP|IPTM' = 0x54,
  'NSFNET-IGP' = 0x55,
  'DGP' = 0x56,
  'TCF' = 0x57,
  'EIGRP' = 0x58,
  'OSPF' = 0x59,
  'Sprite-RPC' = 0x5a,
  'LARP' = 0x5b,
  'MTP' = 0x5c,
  'AX.25' = 0x5d,
  'OS' = 0x5e,
  'MICP' = 0x5f,
  'SCC-SP' = 0x60,
  'ETHERIP' = 0x61,
  'ENCAP' = 0x62,
  'GMTP' = 0x64,
  'IFMP' = 0x65,
  'PNNI' = 0x66,
  'PIM' = 0x67,
  'ARIS' = 0x68,
  'SCPS' = 0x69,
  'QNX' = 0x6a,
  'A/N' = 0x6b,
  'IPComp' = 0x6c,
  'SNP' = 0x6d,
  'Compaq-Peer' = 0x6e,
  'IPX-in-IP' = 0x6f,
  'VRRP' = 0x70,
  'PGM' = 0x71,
  'L2TP' = 0x73,
  'DDX' = 0x74,
  'IATP' = 0x75,
  'STP' = 0x76,
  'SRP' = 0x77,
  'UTI' = 0x78,
  'SMP' = 0x79,
  'SM' = 0x7a,
  'PTP' = 0x7b,
  'IS-IS over IPv4' = 0x7c,
  'FIRE' = 0x7d,
  'CRTP' = 0x7e,
  'CRUDP' = 0x7f,
  'SSCOPMCE' = 0x80,
  'IPLT' = 0x81,
  'SPS' = 0x82,
  'PIPE' = 0x83,
  'SCTP' = 0x84,
  'FC' = 0x85,
  'RSVP-E2E-IGNORE' = 0x86,
  'Mobility Header' = 0x87,
  'UDPLite' = 0x88,
  'MPLS-in-IP' = 0x89,
  'manet' = 0x8a,
  'HIP' = 0x8b,
  'Shim6' = 0x8c,
  'WESP' = 0x8d,
  'ROHC' = 0x8e,
  'Ethernet' = 0x8f,
  'AGGFRAG' = 0x90,
  'NSH' = 0x91,
  'Unassigned_1' = 0x92,
  'Unassigned_2' = 0x93,
  'Unassigned_3' = 0x94,
  'Unassigned_4' = 0x95,
  'Unassigned_5' = 0x96,
  'Unassigned_6' = 0x97,
  'Unassigned_7' = 0x98,
  'Unassigned_8' = 0x99,
  'Unassigned_9' = 0x9a,
  'Unassigned_10' = 0x9b,
  'Unassigned_11' = 0x9c,
  'Unassigned_12' = 0x9d,
  'Unassigned_13' = 0x9e,
  'Unassigned_14' = 0x9f,
  'Unassigned_15' = 0xa0,
  'Unassigned_16' = 0xa1,
  'Unassigned_17' = 0xa2,
  'Unassigned_18' = 0xa3,
  'Unassigned_19' = 0xa4,
  'Unassigned_20' = 0xa5,
  'Unassigned_21' = 0xa6,
  'Unassigned_22' = 0xa7,
  'Unassigned_23' = 0xa8,
  'Unassigned_24' = 0xa9,
  'Unassigned_25' = 0xaa,
  'Unassigned_26' = 0xab,
  'Unassigned_27' = 0xac,
  'Unassigned_28' = 0xad,
  'Unassigned_29' = 0xae,
  'Unassigned_30' = 0xaf,
  'Unassigned_31' = 0xb0,
  'Unassigned_32' = 0xb1,
  'Unassigned_33' = 0xb2,
  'Unassigned_34' = 0xb3,
  'Unassigned_35' = 0xb4,
  'Unassigned_36' = 0xb5,
  'Unassigned_37' = 0xb6,
  'Unassigned_38' = 0xb7,
  'Unassigned_39' = 0xb8,
  'Unassigned_40' = 0xb9,
  'Unassigned_41' = 0xba,
  'Unassigned_42' = 0xbb,
  'Unassigned_43' = 0xbc,
  'Unassigned_44' = 0xbd,
  'Unassigned_45' = 0xbe,
  'Unassigned_46' = 0xbf,
  'Unassigned_47' = 0xc0,
  'Unassigned_48' = 0xc1,
  'Unassigned_49' = 0xc2,
  'Unassigned_50' = 0xc3,
  'Unassigned_51' = 0xc4,
  'Unassigned_52' = 0xc5,
  'Unassigned_53' = 0xc6,
  'Unassigned_54' = 0xc7,
  'Unassigned_55' = 0xc8,
  'Unassigned_56' = 0xc9,
  'Unassigned_57' = 0xca,
  'Unassigned_58' = 0xcb,
  'Unassigned_59' = 0xcc,
  'Unassigned_60' = 0xcd,
  'Unassigned_61' = 0xce,
  'Unassigned_62' = 0xcf,
  'Unassigned_63' = 0xd0,
  'Unassigned_64' = 0xd1,
  'Unassigned_65' = 0xd2,
  'Unassigned_66' = 0xd3,
  'Unassigned_67' = 0xd4,
  'Unassigned_68' = 0xd5,
  'Unassigned_69' = 0xd6,
  'Unassigned_70' = 0xd7,
  'Unassigned_71' = 0xd8,
  'Unassigned_72' = 0xd9,
  'Unassigned_73' = 0xda,
  'Unassigned_74' = 0xdb,
  'Unassigned_75' = 0xdc,
  'Unassigned_76' = 0xdd,
  'Unassigned_77' = 0xde,
  'Unassigned_78' = 0xdf,
  'Unassigned_79' = 0xe0,
  'Unassigned_80' = 0xe1,
  'Unassigned_81' = 0xe2,
  'Unassigned_82' = 0xe3,
  'Unassigned_83' = 0xe4,
  'Unassigned_84' = 0xe5,
  'Unassigned_85' = 0xe6,
  'Unassigned_86' = 0xe7,
  'Unassigned_87' = 0xe8,
  'Unassigned_88' = 0xe9,
  'Unassigned_89' = 0xea,
  'Unassigned_90' = 0xeb,
  'Unassigned_91' = 0xec,
  'Unassigned_92' = 0xed,
  'Unassigned_93' = 0xee,
  'Unassigned_94' = 0xef,
  'Unassigned_95' = 0xf0,
  'Unassigned_96' = 0xf1,
  'Unassigned_97' = 0xf2,
  'Unassigned_98' = 0xf3,
  'Unassigned_99' = 0xf4,
  'Unassigned_100' = 0xf5,
  'Unassigned_101' = 0xf6,
  'Unassigned_102' = 0xf7,
  'Unassigned_103' = 0xf8,
  'Unassigned_104' = 0xf9,
  'Unassigned_105' = 0xfa,
  'Unassigned_106' = 0xfb,
  'Unassigned_107' = 0xfc,
  'Experimental_0' = 0xfd,
  'Experimental_1' = 0xfe,
  'Reserved' = 0xff,
}

export type Packet<T> = {
  bytes: number;
  bytePosition?: number;
  buffer?: Buffer;
  readingBuffer?: Buffer;
} & T;

export enum MDNS_FLAG_OPERATION_CODES {
  QUERY = 0,
  INVERSE_QUERY = 1,
  STATUS = 2,
}

export enum MDNS_FLAG_RESPONSE_CODES {
  'NoError' = 0,
  'FormErr' = 1,
  'ServFail' = 2,
  'NXDomain' = 3,
  'NotImp' = 4,
  'Refused' = 5,
  'YXDomain' = 6,
  'YXRRSet' = 7,
  'NXRRSet' = 8,
  'NotAuth' = 9,
  'NotZone' = 10,
  'DSOTYPENI' = 11,
  'BADSIG|BADVERS' = 16,
  'BADKEY' = 17,
  'BADTIME' = 18,
  'BADMODE' = 19,
  'BADNAME' = 20,
  'BADALG' = 21,
  'BADTRUNC' = 22,
  'BADCOOKIE' = 23,
  'Reserved, can be allocated by Standards Action' = 65535,
}

export enum MDNS_FLAG_RESPONSE_CODE_NAMES {
  'No Error' = 0,
  'Format Error' = 1,
  'Server Failure' = 2,
  'Non-Existent Domain' = 3,
  'Not Implemented' = 4,
  'Query Refused' = 5,
  'Name Exists when it should not' = 6,
  'Resource Record Set Exists when it should not' = 7,
  'Resource Record Set that should exist does not' = 8,
  'Not Authorized' = 9,
  'Name not contained in zone' = 10,
  'DSO-TYPE Not Implemented' = 11,
  'Bad OPT Version | TSIG Signature Failure' = 16,
  'Key not recognized' = 17,
  'Signature out of time window' = 18,
  'Bad TKEY Mode' = 19,
  'Duplicate key name' = 20,
  'Algorithm not supported' = 21,
  'Bad Truncation' = 22,
  'Bad/missing Server Cookie' = 23,
}

export type MDNSQueryOperationCode = {
  code: Numeral;
  name: keyof typeof MDNS_FLAG_OPERATION_CODES;
};

export type MDNSFlagResponseCode = {
  value: Numeral;
  code: keyof typeof MDNS_FLAG_RESPONSE_CODES;
  name: keyof typeof MDNS_FLAG_RESPONSE_CODE_NAMES;
};
export type MDNSFlags = {
  value: Numeral;
  query: boolean;
  reply: boolean;
  operationCode: number;
  aa: boolean;
  tc: boolean;
  rd: boolean;
  ra: boolean;
  ad: boolean;
  cd: boolean;
  z: number;
  rcode: number;
  details?: {
    operationCode?: MDNSQueryOperationCode;
    authoritativeAnswer?: boolean;
    truncation?: boolean;
    recursionDesired?: boolean;
    recursionAvailable?: boolean;
    authenticatedAnswer?: boolean;
    unacceptable?: boolean;
    zero?: number;
    responseCode?: MDNSFlagResponseCode;
  };
};
export type MDNSHeader = {
  id: number;
  flags: Numeral;
  questions: number;
  answerResourceRecords: number;
  authorityResourceRecords: number;
  additionalResourceRecords: number;
  details?: {
    flags?: MDNSFlags;
  };
};

export type MacAddress = {
  address: string;
  octets: number[];
  identifier: number;
  castType: number;
  identifierName: keyof typeof ETHERNET_INDENTIFIER;
  castTypeName: keyof typeof ETHERNET_CAST_TYPE;
  vendor: MacVendor;
};

export type EthernetFrameProtocol = {
  value: Numeral;
  name: keyof typeof ETHERNET_TYPES;
};

export type EthernetFrame = {
  sourceMacAddress: string;
  destinationMacAddress: string;
  protocol: Numeral;
  details?: {
    sourceMacAddress?: MacAddress;
    destinationMacAddress?: MacAddress;
    protocol?: EthernetFrameProtocol;
  };
};

export type IPFrameFlags = {
  reserved: number;
  DF: boolean;
  MF: boolean;
};

export type IPFrameDCSP = { value: Numeral; name: keyof typeof DCSP_VALUES };

export type IPFrameECN = { value: Numeral; name: keyof typeof ECN_VALUES };
export type IPFrameProtocol = {
  value: Numeral;
  name: keyof typeof IP_PROTOCOLS;
};
export type IPv4Frame = {
  version: number;
  headerLength: number;
  dcsp: Numeral;
  ecn: Numeral;
  length: number;
  identification: Numeral;
  flags: Numeral;
  fragmentOffset: Numeral;
  ttl: number;
  protocol: Numeral;
  checksum: Numeral;
  sourceIP: string;
  destinationIP: string;
  details?: {
    identification?: Numeral;
    protocol?: IPFrameProtocol;
    dcsp?: IPFrameDCSP;
    ecn?: IPFrameECN;
    flags?: IPFrameFlags;
  };
};

export type UDPProtocol = {
  sourcePort: number;
  destinationPort: number;
  length: number;
  checksum: Numeral;
};

export type IPv6Frame = {
  version: number;
  dcsp: Numeral;
  ecn: Numeral;
  flowLabel: Numeral;
  length: number;
  hopLimit: number;
  protocol: Numeral;
  sourceIP: string;
  destinationIP: string;
  details?: {
    flowLabel: Numeral;
    protocol?: IPFrameProtocol;
    dcsp?: IPFrameDCSP;
    ecn?: IPFrameECN;
  };
};
export type Frame = {
  ethernet: Packet<EthernetFrame>;
  ip: Packet<IPv4Frame | IPv6Frame>;
  protocol?: Packet<UDPProtocol>;
};

export type Name = {
  value: string;
  length: number;
  labels: string[];
  complete: boolean;
  hasPointer: boolean;
};

export type Question = {
  name?: string;
  type?: Numeral;
  response?: boolean;
  class?: Numeral;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
    class: {
      value: Numeral;
      name: keyof typeof MDNS_QUESTION_CLASSES;
    };
    name: Name;
  };
};

export type ResourceRecords = PTR | TXT | SRV | A | AAAA | NSEC | Raw;
export type Answer = {
  name?: string;
  type?: Numeral;
  cacheFlush?: boolean;
  class?: Numeral;
  ttl?: number;
  length?: number;
  data?: Packet<ResourceRecords>;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
    class: {
      value: Numeral;
      name: keyof typeof MDNS_QUESTION_CLASSES;
    };
    name: Name;
  };
};

export type PTR = {
  domainName?: string;
  type?: Numeral;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
    domainName: Name;
  };
};

export type TXT = {
  data?: Record<string, string>;
  keys?: string[];
  values?: string[];
  length?: number;
  type?: Numeral;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
  };
};

export type SRV = {
  region?: string;
  service?: string;
  protocol?: string;
  name?: string;
  length?: number;
  priority?: number;
  weight?: number;
  port?: number;
  target?: string;
  details?: {
    target: Name;
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
  };
};

export type TypesInBitmap = {
  types?: {
    value: Numeral;
    name: keyof typeof MDNS_RECORD_TYPES;
  }[];
};

export type NSEC = {
  nextDomain?: string;
  resourceRecordTypesInBitmap: string[];
  details?: {
    nextDomain: Name;
    resourceRecordTypesInBitmap: Packet<TypesInBitmap>;
  };
};
export type A = {
  ip?: string;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
  };
};

export type AAAA = {
  ip?: string;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
  };
};

export type Raw = {
  value?: Buffer;
  type?: Numeral;
  details?: {
    type: {
      value: Numeral;
      name: keyof typeof MDNS_RECORD_TYPES;
    };
  };
};

// export type Decoder<T = PacketTypes> = (buffer: Buffer, offset?: number) => Packet<T>;
// export type Encoder<T = PacketTypes> = (Packet: T) => Packet<T>;

// export type CompletePacket = {
//   header: Packet<MDNSHeader>;
//   questions: List<Question>;
//   // answer: DecodedAnswer;
//   // authorities: DecodedAnswer;
//   // additionals: DecodedAnswer;
// };

export type DecodedOptions<T> = {
  offset?: number;
  frameOffset?: number;
  length?: number;
  labels?: string[];
  payloadFields?: { [key in keyof Packet<T>]?: boolean };
};

export type Decoder<T, O extends object = NonNullable<unknown>> = (
  buffer: Buffer,
  options?: DecodedOptions<T> & O,
) => Packet<T>;

export type RecordResoureListTypes = Question | Answer;
export type List<T = RecordResoureListTypes> = {
  value: T[];
};

export type ListOptions = {
  count: number;
  type: MDNS_RESOURCE_RECORDS_TYPES;
};
export type MDNSResourceRecordTypes = Name | Question | List<Question>;

export type RawDecodedOptions = {
  type?: number;
};

export type DecodedPacket = {
  header: Packet<Packet<MDNSHeader>>;
  questions: Packet<List<Question>>;
  answers: Packet<List<Answer>>;
  authorities: Packet<List<Answer>>;
  additionals: Packet<List<Answer>>;
};
