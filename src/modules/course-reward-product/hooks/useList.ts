import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList, GetLessonRewardsQuery } from '../api';

export const useLessonRewardList = (params: GetLessonRewardsQuery) => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['lesson_reward_list', params],
    queryFn: () => GetDatasList(params),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
