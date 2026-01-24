import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getQuizzesList } from '../adapters';
import { GetQuizzesList } from '../api';

export const useQuizzesList = (lessonId: string, currentPage: number) => {
  const initialData = {
    data: getQuizzesList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['exam_list', lessonId, currentPage],
    queryFn: () => GetQuizzesList(lessonId, currentPage),
    select: (data) => ({
      data: getQuizzesList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
