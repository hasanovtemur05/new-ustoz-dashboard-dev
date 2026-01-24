import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetDalyCertificateCount } from '../api';
import { DateRange } from 'react-day-picker';

export const useDailyCertificateCount = (date?: DateRange) => {
  const { data, ...args } = useQuery({
    queryKey: ['daily_certificate_count', date],
    queryFn: () => GetDalyCertificateCount(date),
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
