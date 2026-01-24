import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useProductsList = (pageSize: number, page: number, id: string) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['products_list', pageSize, page, id],
    queryFn: () => GetDatasList(pageSize, page, id),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      pagenationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
