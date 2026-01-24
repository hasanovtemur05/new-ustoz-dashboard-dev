import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetCoinStatistics } from '../api';

export const useCoinStatistics = (from?:number, to?:number) => {
  const { data, ...args } = useQuery({
    queryKey: ['users_by_auth_method', from,to],
    queryFn: () => GetCoinStatistics(from,to),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
