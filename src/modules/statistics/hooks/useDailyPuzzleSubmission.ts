import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetDalyDonation } from '../api';
import { DateRange } from 'react-day-picker';
import { PuzzleDifficulty } from 'modules/puzzles/types';

export const useDalyDonation = (date?: DateRange) => {
  const { data, ...args } = useQuery({
    queryKey: ['daily_puzzle_submission', date],
    queryFn: () => GetDalyDonation(date),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
