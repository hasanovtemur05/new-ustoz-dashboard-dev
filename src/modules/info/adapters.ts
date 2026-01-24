import { InfoType } from './types';
export const getInfo = (item?: InfoType) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    url: item?.url ?? '',
    photo: item?.photo ?? '',
    course: item?.course ?? '',
    date: item?.date ?? '',
  };
};

export const getInfosList = (data?: InfoType[]) => {
  return data?.length
    ? data.map(item => {
        return getInfo(item);
      })
    : [];
};
