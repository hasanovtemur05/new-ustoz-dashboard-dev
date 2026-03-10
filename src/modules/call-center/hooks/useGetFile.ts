import { useQuery } from '@tanstack/react-query';
import { GetFile } from '../api';

export const useGetFile = () => {
  const query = useQuery({
    queryKey: ['file'],
    queryFn: () => GetFile(),
    enabled: false, 
  });

  return query;
};
