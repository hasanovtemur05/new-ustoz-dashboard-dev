import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetNewUsers } from '../api';
import { DateRange } from 'react-day-picker';

export const useNewUsers = (date?: DateRange) => {
  const { data, ...args } = useQuery({
    queryKey: ['new_users_count', date],
    queryFn: () => GetNewUsers(date),
    select: data => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
