import { FortunaProduct, FortunaProductType } from './types';

export const getData = (item?: FortunaProduct) => {
  return {
    id: item?.id ?? '',
    probability: item?.probability ?? 0,
    value: item?.value ?? 0,
    title: item?.title ?? '',
    photo: item?.photo ?? '',
    content: item?.content ?? '',
    count: item?.count ?? 0,
    type: item?.type ?? FortunaProductType.EMPTY,
    isActive: true,
  };
};

export const getDatasList = (data?: FortunaProduct[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
