import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useProductsList = (
  pageNumber: number = 1,
  pageSize: number = 20,
  categoryId?: string,
  isActiveOnGift?: boolean,
  search?: string,
  isActive?: boolean
) => {
  const initialData = {
    data: getDatasList(),
    pagination: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['products_list', pageNumber, pageSize, categoryId, isActiveOnGift, search, isActive],
    queryFn: () => GetDatasList(pageNumber, pageSize, categoryId, isActiveOnGift, search, isActive),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      pagination: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
