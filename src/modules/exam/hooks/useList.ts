import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useExamsList = (id:string) => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['exam_list'],
    queryFn: () => GetDatasList(id),
    select: data => ({
      data: getDatasList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
