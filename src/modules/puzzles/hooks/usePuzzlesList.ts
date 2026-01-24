import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getPuzzlesList } from '../adapters';
import { GetPuzzlesList } from '../api';

export const usePuzzlesList = (currentPage: number) => {
  const initialData = {
    data: getPuzzlesList(),
    paginationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['puzzles_list', currentPage],
    queryFn: () => GetPuzzlesList(currentPage),
    select: data => ({
      data: getPuzzlesList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.pagination_info'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
