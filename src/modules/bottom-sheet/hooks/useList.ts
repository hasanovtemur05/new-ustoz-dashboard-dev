import { useQuery } from '@tanstack/react-query';

import { GetDatasList } from '../api';
interface GetDatasListParams {
  pageNumber?: number;
  pageSize?: number;
  isActive?: boolean;
}

export const useBottomShettList = (params?: GetDatasListParams ) => {
  return useQuery({
    queryKey: ['bottomsheet_list', params],
    queryFn: () => GetDatasList(params),
  });
};
