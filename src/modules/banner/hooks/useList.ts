import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useBannersList = () => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['banners_list'],
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
