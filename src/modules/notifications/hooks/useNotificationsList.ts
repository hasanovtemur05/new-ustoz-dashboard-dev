import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getNotificationsList } from '../adapters';
import { GetNotificationsList } from '../api';

export const useNotificationsList = (currentPage: number, pageSize: number, enabled: boolean) => {
  const initialData = {
    data: getNotificationsList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['notifications_list', currentPage, pageSize],
    queryFn: () => GetNotificationsList(currentPage, pageSize),
    select: (data) => ({
      data: getNotificationsList(get(data, 'data.data.data')),
      pagenationInfo: get(data, 'data.data.meta.pagination'),
    }),
    enabled,
  });

  return {
    ...data,
    ...args,
  };
};
