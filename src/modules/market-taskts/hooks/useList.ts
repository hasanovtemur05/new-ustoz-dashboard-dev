import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useMarketTaskList = (pageSize: number) => {
  const initialData = {
    data: getDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['market_task_list'],
    queryFn: () => GetDatasList(pageSize),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
