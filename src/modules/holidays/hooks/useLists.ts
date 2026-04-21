import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getHolidaysList } from '../adapters';
import { GetDatasList } from '../api';

export const useHolidaysList = () => {
  const initialData = {
    data: getHolidaysList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['holidays_list'],
    queryFn: () => GetDatasList(),
    select: (data) => ({
      data: getHolidaysList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
