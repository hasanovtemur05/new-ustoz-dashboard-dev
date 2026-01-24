import { CategoryType } from './types';
export const getData = (item?: CategoryType) => {
  
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    isActive: item?.isActive ?? false,
    date: item?.date ?? '',
  };
};

export const getDatasList = (data?: CategoryType[]) => {
  return data?.length
    ? data?.map(item => {
      return getData(item);
    })
    : [];
};
