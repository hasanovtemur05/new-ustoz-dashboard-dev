import { ICourseReward } from './types';
export const getData = (item?: ICourseReward) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    orderId: item?.orderId ?? 0,
    reward: item?.reward ?? '',
    rewardId: item?.rewardId ?? '',
    lessonId: item?.lessonId ?? '',
    partId: item?.partId ?? '',
  };
};

export const getDatasList = (data?: ICourseReward[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
