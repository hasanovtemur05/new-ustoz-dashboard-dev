import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList, getUserDatasList } from '../adapters';
import { GetDatasList, GetUserList } from '../api';
import { User } from '../types';

export const usePremiumList = (currentPage: number) => {
  const initialData = {
    data: getDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['premium_list', currentPage],
    queryFn: () => GetDatasList(currentPage),
    select: (data) => {
      return {
        data: getDatasList(get(data, 'data.data.data')),
        paginationInfo: get(data, 'data.data.meta.pagination'),
      };
    },
  });

  return {
    ...data,
    ...args,
  };
};

// user list
export const useUsersListForPremium = (currentPage: number, searchValue: string) => {
  const initialData = {
    data: getUserDatasList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['users_list', currentPage, searchValue],
    queryFn: () => GetUserList(currentPage, searchValue),
    select: (data) => ({
      data: getUserDatasList(get(data, 'data')) as User[],
      paginationInfo: get(data, 'pagination'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
