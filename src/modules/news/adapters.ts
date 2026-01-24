import { News } from './types';
export const getNewsItem = (item?: News) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    content: item?.content ?? '',
    photo: item?.photo ?? '',
    createdAt: item?.createdAt ?? '',
  };
};

export const getNewsList = (data?: News[]) => {
  return data?.length
    ? data.map(item => {
        return getNewsItem(item);
      })
    : [];
};
