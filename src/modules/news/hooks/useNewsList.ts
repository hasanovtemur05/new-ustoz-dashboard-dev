import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getNewsList } from '../adapters';
import { GetNewsList } from '../api';

export const useNewsList = (currentPage: number) => {
  const initialData = {
    data: getNewsList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['news_list'],
    queryFn: () => GetNewsList(currentPage),
    select: (data) => ({
      data: getNewsList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
