import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import {  GetFortunaPromocodeDatasList } from '../api';

export const usePromocodeProductsList = () => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['reward_promocode_list_for_select'],
    queryFn: () => GetFortunaPromocodeDatasList(),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
