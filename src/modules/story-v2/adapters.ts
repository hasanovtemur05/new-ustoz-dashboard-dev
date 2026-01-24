import { StoryV2Type } from './types';
export const getData = (item?: StoryV2Type) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    thumbnailUrl: item?.thumbnailUrl ?? '',
    media: item?.media ?? [],
  };
};

export const getDatasList = (data?: StoryV2Type[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
