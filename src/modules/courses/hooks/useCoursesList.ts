import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getCoursesList } from '../adapters';
import { GetCoursesList } from '../api';

export const useCoursesList = ({currentPage , isEnabled = true , }: {currentPage?: number , isEnabled?: boolean } = {}) => {
  const initialData = {
    data: getCoursesList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['courses_list' ,currentPage],
    queryFn: () => GetCoursesList(currentPage),
    select: (data) => ({
      data: getCoursesList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
    enabled: isEnabled,
  });

  return {
    ...data,
    ...args,
  };
};
