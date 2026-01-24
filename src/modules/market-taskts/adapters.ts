import { IMarketTask } from './types';
import { TaskFrequency, TaskEvent, TaskType } from './constants';

export const getData = (item?: IMarketTask): IMarketTask => {
  return {
    id: item?.id ?? '',
    points: item?.points ?? 0,
    title: item?.title ?? '',
    photo: item?.photo ?? '',
    description: item?.description ?? '',
    frequency: item?.frequency ?? TaskFrequency.ONCE,
    event: item?.event ?? TaskEvent.SURVEY,
    type: item?.type ?? TaskType.MANUAL,
    surveyId: item?.surveyId,
    isActive: item?.isActive ?? true,
    startsAt: item?.startsAt,
    endsAt: item?.endsAt,
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: IMarketTask[]): IMarketTask[] => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
