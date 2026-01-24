import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const usePremiumPlansList = (currentPage: number, limit: number) => {
  const initialData = {
    data: getDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['premiumPlans_list', currentPage],
    queryFn: () => GetDatasList(currentPage, limit),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
