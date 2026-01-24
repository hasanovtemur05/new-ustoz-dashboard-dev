import { StoryType } from './types';
export const getData = (item?: StoryType) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    link: item?.link ?? '',
    photo: item?.photo ?? '',
    deadline: item?.deadline ?? '',
    video: item?.video ?? '',
    type: item?.type ?? '',
    content: item?.content ?? '',
    objectId: item?.objectId ?? '',
    button: item?.button ?? '',
  };
};

export const getDatasList = (data?: StoryType[]) => {
  return data?.length
    ? data.map(item => {
      return getData(item);
    })
    : [];
};
