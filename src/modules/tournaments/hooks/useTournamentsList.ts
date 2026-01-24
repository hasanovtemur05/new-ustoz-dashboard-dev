import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getTournamentsList } from '../adapters';
import { GetTournamentsList } from '../api';

export const useTournamentsList = () => {
  const initialData = {
    data: getTournamentsList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['tournaments_list'],
    queryFn: () => GetTournamentsList(),
    select: data => ({
      data: getTournamentsList(get(data, 'data.data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
