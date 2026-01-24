import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetUsersByAuthMethod } from '../api';
import { DateRange } from 'react-day-picker';
import { AuthType } from '../types';

export const useUsersByAuthMethod = (type: AuthType, date?: DateRange) => {
  const { data, ...args } = useQuery({
    queryKey: ['users_by_auth_method', date, type],
    queryFn: () => GetUsersByAuthMethod(type, date),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
