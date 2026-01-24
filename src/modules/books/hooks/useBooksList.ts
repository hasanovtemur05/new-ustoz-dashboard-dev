import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getBooksList } from '../adapters';
import { GetBooksList } from '../api';

export const useBooksList = (currentPage: number) => {
  const initialData = {
    data: getBooksList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['books_list'],
    queryFn: () => GetBooksList(currentPage),
    select: (data) => ({
      data: getBooksList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
