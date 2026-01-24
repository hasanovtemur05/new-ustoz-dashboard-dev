import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetUsersByHalfCompletedCourses } from '../api';
import { DateRange } from 'react-day-picker';
import { AuthType } from '../types';

export const useHalfComplitedCourse = (type: AuthType, date?: DateRange) => {
  const { data, ...args } = useQuery({
    queryKey: ['half_complited_course', date, type],
    queryFn: () => GetUsersByHalfCompletedCourses(type, date),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
