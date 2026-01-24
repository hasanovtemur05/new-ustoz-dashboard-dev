import { LessonReward, LessonRewardType } from './types';

export const getData = (item?: LessonReward) => {
  return {
    id: item?.id ?? '',
    value: item?.value ?? 0,
    title: item?.title ?? '',
    photo: item?.photo ?? '',
    description: item?.description ?? '',
    count: item?.count ?? 0,
    type: item?.type ?? LessonRewardType.EMPTY,
    file: item?.file ?? '',

  };
};

export const getDatasList = (data?: LessonReward[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
