import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getVacanciesList } from '../adapters';
import { GetVacanciesList } from '../api';

export const useVacanciesList = () => {
  const initialData = {
    data: getVacanciesList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['vacancies_list'],
    queryFn: () => GetVacanciesList(),
    select: data => ({
      data: getVacanciesList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
