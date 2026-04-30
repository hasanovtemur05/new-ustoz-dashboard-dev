import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetBannerPhotos } from '../api';
import { getBannerPhotosList } from '../adapters';

export const useBannerPhotosList = (pageNumber: number = 1, pageSize: number = 10, whereIs?: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['banner_photos_list', pageNumber, pageSize, whereIs],
    queryFn: () => GetBannerPhotos(pageNumber, pageSize, whereIs),
    select: (res) => ({
      data: getBannerPhotosList(get(res, 'data.data.data')),
      paginationInfo: {
        count: get(res, 'data.data.count'),
        pageNumber: get(res, 'data.data.pageNumber'),
        pageSize: get(res, 'data.data.pageSize'),
        pageCount: Math.ceil(get(res, 'data.data.count') / get(res, 'data.data.pageSize')),
      }
    }),
  });

  return {
    data: data?.data || [],
    paginationInfo: data?.paginationInfo,
    ...args,
  };
};
