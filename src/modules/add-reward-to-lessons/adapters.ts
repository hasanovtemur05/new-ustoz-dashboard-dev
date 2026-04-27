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
    rewardType: item?.rewardType ?? '',
    rewardPhoto: item?.rewardPhoto ?? '',
    isPartial: item?.isPartial ?? false,
    partNumber: item?.partNumber ?? 0,
    totalParts: item?.totalParts ?? 0,
  };
};

export const getDatasList = (data?: ICourseReward[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
