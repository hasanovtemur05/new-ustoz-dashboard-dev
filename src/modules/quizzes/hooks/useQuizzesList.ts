import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getQuizzesList } from '../adapters';
import { GetQuizzesList } from '../api';

export const useQuizzesList = (lessonId: string) => {
  const initialData = {
    data: getQuizzesList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['quizzes_list', lessonId],
    queryFn: () => GetQuizzesList(lessonId),
    select: data => ({
      data: getQuizzesList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
