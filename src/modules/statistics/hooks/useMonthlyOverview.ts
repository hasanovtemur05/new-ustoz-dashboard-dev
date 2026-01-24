import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetMonthlyOverview } from '../api';
import type { IMonthlyOwerviewData } from '../types';

// Define the actual API response structure
interface ApiResponse {
  data: {
    data: IMonthlyOwerviewData;
  };
}

export const useMonthlyOverview = () => {
  const { data, ...args } = useQuery<ApiResponse, Error, IMonthlyOwerviewData>({
    queryKey: ['monthly-overview'],
    queryFn: () => GetMonthlyOverview(),
    select: (data) => {
      return get(data, 'data.data') as IMonthlyOwerviewData;
    },
  });

  return {
    data,
    ...args,
  };
};
