import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getModulesList } from '../adapters';
import { GetModulesList } from '../api';

export const useModulesList = (courseId: string) => {
  const initialData = {
    data: getModulesList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['modules_list', courseId],
    queryFn: () => GetModulesList(courseId),
    select: data => {
      const modulesList = getModulesList(get(data, 'data.data.data'));
      // const sortedModulesList = modulesList.sort((a, b) => a.order - b.order);
      return { data: modulesList };
    },
  });

  return {
    ...data,
    ...args,
  };
};
