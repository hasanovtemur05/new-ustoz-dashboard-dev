import { IMeeting, MeetingType } from './types';
export const getMeeting = (item?: IMeeting) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    description: item?.description ?? '',
    banner: item?.banner ?? '',
    link: item?.link ?? '',
    type: item?.type ?? MeetingType.EMPTY,
    startsAt: item?.startsAt ?? '',
  };
};

export const getMeetingsList = (data?: IMeeting[]) => {
  return data?.length
    ? data.map((item) => {
        return getMeeting(item);
      })
    : [];
};
