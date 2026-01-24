import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';
import { DateRange } from 'react-day-picker';

export const useUserByHalfCourse = (currentPage: number, courseId?: string, region?: string, district?: string, date?: DateRange) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: {
      total_pages: 0,
      prev_page: 0,
      next_page: 0,
      current_page: 1,
    },
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['user_helf_course', currentPage, courseId, region, district, date],
    queryFn: () => GetDatasList(currentPage, courseId, region, district, date),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      pagenationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });
  return {
    ...data,
    ...args,
    // pagenationInfo
  };
};
