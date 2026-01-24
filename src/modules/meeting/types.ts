export enum MeetingType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE ',
  EMPTY = '',
}
export interface IMeeting {
  id: string;
  title: string;
  description: string;
  banner: string;
  link: string;
  type: MeetingType;
  startsAt: string;
}

export interface IMeetingInput {
  title: string;
  description: string;
  banner: string;
  link: string;
  type: MeetingType;
  startsAt: string;
}

export interface IMeetingEditBody {
  id: string;
  values: IMeetingInput;
}
