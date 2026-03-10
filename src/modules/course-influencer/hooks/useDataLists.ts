import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetInfluencerList } from '../api';
import { getInfluencerList } from '../adapters';


export const useInfluencerList = (courseId: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['influencer_list', courseId],
    queryFn: () => GetInfluencerList(courseId),
    select: (res) => ({
      data: getInfluencerList(get(res, 'data.data')),
    }),
  });

  return {
    data: data?.data ?? [],                
    ...args,
  };
};