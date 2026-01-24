import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

interface OrderFilters {
  type: string;
  status?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

export const useOredersList = (currentPage: number, filters: OrderFilters) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: {
      total_pages: 0,
      prev_page: 0,
      next_page: 0,
      current_page: 1,
    },
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['order_list', currentPage, filters],
    queryFn: () => GetDatasList(currentPage, filters),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      pagenationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });
  return {
    ...data,
    ...args,
    // pagenationInfo
  };
};
