import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useCategoriesList = (page:number) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['categories_list',page],
    queryFn: () => GetDatasList(page),
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
