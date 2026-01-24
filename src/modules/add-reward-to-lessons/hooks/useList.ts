import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useCourseRewardList = (currentPage: number, courseId: string) => {
  const initialData = {
    data: getDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['course_rewards_list', currentPage, courseId],
    queryFn: () => GetDatasList(currentPage, courseId),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
