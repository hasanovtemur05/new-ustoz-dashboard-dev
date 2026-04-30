import { BannerPhoto } from './types';

export const getBannerPhoto = (item?: any): BannerPhoto => {
  return {
    id: item?.id ?? "",
    title: item?.title ?? "",
    photo: item?.photo ?? "",
    whereIs: item?.whereIs ?? "",
    createdAt: item?.createdAt ?? "",
  };
};

export const getBannerPhotosList = (data?: BannerPhoto[]) => {
  return data?.length
    ? data.map((item) => {
        return getBannerPhoto(item);
      })
    : [];
};
