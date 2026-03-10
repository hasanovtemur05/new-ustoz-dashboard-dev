import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getGamesList } from '../adapters';
import { GetgamesList } from '../api';

export const useGamesLists = () => {
  const initialData = {
    data: getGamesList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['web-games_list'],
    queryFn: () => GetgamesList(),
    select: data => ({
      data: getGamesList(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
