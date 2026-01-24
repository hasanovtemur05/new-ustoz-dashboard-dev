import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';

export const useLessonRewardList = (pageSize: number) => {
  const initialData = {
    data: getDatasList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['lesson_reward_list'],
    queryFn: () => GetDatasList(pageSize),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
