import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getLessonsList } from '../adapters';
import { GetCourseLessonsList } from '../api';

export const useCourseLessonsList = (courseId: string) => {
  const initialData = {
    data: [],
    paginationInfo: null,
  };

  const { data = initialData, ...args } = useQuery({
    queryKey: ['course_lessons_list', courseId],
    queryFn: () => GetCourseLessonsList(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (data) => {
      const lessonsList = getLessonsList(get(data, 'data.data', []));

      return {
        data: lessonsList,
      };
    },
  });

  return {
    ...data,
    ...args,
  };
};
