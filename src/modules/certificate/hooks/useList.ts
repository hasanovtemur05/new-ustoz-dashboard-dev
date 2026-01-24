import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList, getRecomList } from '../adapters';
import { GetDatasList } from '../api';
import { GetRecomList } from '../api';

export const useCertificatesList = (currentPage: number) => {
  const initialData = {
    data: getDatasList(), // getData har doim id beradi
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['certificates_list', currentPage],
    queryFn: () => GetDatasList(currentPage),
    select: (res) => ({
      data: getDatasList(get(res, 'data.data.data')),
      paginationInfo: get(res, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
  });

  return { ...data, ...args };
};

export const useRecomList = (currentPage: number) => {
  const initialData = {
    data: getRecomList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['recommendation_list', currentPage],
    queryFn: () => GetRecomList(currentPage),
    select: (res) => ({
      data: getRecomList(get(res, 'data.data.data')), // getData2 har doim id beradi
      paginationInfo: get(res, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
  });

  return { ...data, ...args };
};
