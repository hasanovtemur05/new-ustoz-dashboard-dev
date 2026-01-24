import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getInfosList } from '../adapters';
import { GetInfosList } from '../api';

export const useInfosList = () => {
  const initialData = {
    data: getInfosList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['info_list'],
    queryFn: () => GetInfosList(),
    select: data => ({
      data: getInfosList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
