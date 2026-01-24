import { Banner } from './types';
export const getData = (item?: Banner) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    content: item?.content ?? '',
    photo: item?.photo ?? '',
    link: item?.link ?? '',
    objectId: item?.objectId ?? '',
    type: item?.type ?? undefined,
    location: item?.location ?? undefined,

  };
};

export const getDatasList = (data?: Banner[]) => {
  return data?.length
    ? data.map(item => {
      return getData(item);
    })
    : [];
};
