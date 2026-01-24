import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useCourseAssistantList = (currentPage: number) => {
  const initialData = {
    data: getDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['course_assistant_list', currentPage],
    queryFn: () => GetDatasList(currentPage),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
