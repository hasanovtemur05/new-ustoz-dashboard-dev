import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getMeetingsList } from '../adapters';
import { GetMeetingsList } from '../api';

export const useMeetingsList = () => {
  const initialData = {
    data: getMeetingsList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['meetings_list'],
    queryFn: () => GetMeetingsList(),
    select: data => ({
      data: getMeetingsList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
