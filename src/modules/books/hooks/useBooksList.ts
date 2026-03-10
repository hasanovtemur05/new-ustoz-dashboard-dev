import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { getBooksList } from '../adapters';
import { GetBooksList } from '../api';

export const useBooksList = (pageNumber = 1, pageSize = 20) => {
  const { data, ...args } = useQuery({
    queryKey: ['books_list', pageNumber, pageSize],
    queryFn: () => GetBooksList(pageNumber, pageSize),
    select: (res) => ({
      data: getBooksList(get(res, 'data.data.data')),
      paginationInfo: get(res, 'data.data.meta.pagination'),
    }),
  });

  return {
    data: data?.data ?? [],
    paginationInfo: data?.paginationInfo ?? null,                
    ...args,
  };
};