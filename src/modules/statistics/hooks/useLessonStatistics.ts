import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetLessonStatistics } from '../api';
import { DateRange } from 'react-day-picker';
import { AuthType } from '../types';

export const useLessonStatistics = ( ) => {
  const { data, ...args } = useQuery({
    queryKey: ['users_by_auth_method'],
    queryFn: () => GetLessonStatistics(),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
