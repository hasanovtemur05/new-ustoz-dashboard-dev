import { useQuery } from '@tanstack/react-query';
import { GetBoxesList } from '../api';

export const useLessonRewardBoxes = (courseId: string) => {
  return useQuery({
    queryKey: ['lesson_reward_boxes', courseId],
    queryFn: () => GetBoxesList(courseId),
    enabled: !!courseId,
  });
};
