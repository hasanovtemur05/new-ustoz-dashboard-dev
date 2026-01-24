import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useStoriesList = () => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['stories_list'],
    queryFn: () => GetDatasList(),
    select: data => ({
      data: getDatasList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
