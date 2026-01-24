import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getNotificationsList } from '../adapters';
import { GetNotificationsStatisticList } from '../api';

export const useNotificationsStatisticList = (currentPage: number, pageSize: number, enabled:boolean) => {
  const initialData = {
    data: getNotificationsList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['notifications_statistic_list', currentPage, pageSize],
    queryFn: () => GetNotificationsStatisticList(currentPage, pageSize),
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
