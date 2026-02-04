import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList, SearchCourseId, SearchUserId } from '../api';

interface OrderFilters {
  type: string;
  status?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

export const useOredersList = (currentPage: number, filters: OrderFilters) => {
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
    queryKey: ['order_list', currentPage, filters],
    queryFn: () => GetDatasList(currentPage, filters),
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


export const useSearchCoursesId = (search: string) => {
  return useQuery({
    queryKey: ['search-courses', search],
    queryFn: async () => {
      const res = await SearchCourseId(search);
      return get(res, 'data.data') || [];
    },
    enabled: Boolean(search?.trim()),
    staleTime: 1000 * 60 * 5,
  });
};


export const useSearchUserId = (search: string) => {
  return useQuery({
    queryKey: ['search-users', search],
    queryFn: async () => {
      const res = await SearchUserId(search);
      return get(res, 'data.data') || [];
    },
    enabled: Boolean(search?.trim()),
    staleTime: 1000 * 60 * 5,
  });
};
