import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useSuggestionDepartmentsList = () => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['suggestion_departments_list'],
    queryFn: () => GetDatasList(),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
