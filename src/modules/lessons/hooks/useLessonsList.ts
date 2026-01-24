import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { getLessonsList } from "../adapters";
import { GetLessonsList } from "../api";

export const useLessonsList = (moduleId: string, currentPage: number) => {
  const initialData = {
    data: [],
    paginationInfo: null,
  };

  const { data = initialData, ...args } = useQuery({
    queryKey: ["lessons_list", moduleId, currentPage],
    queryFn: () => GetLessonsList(moduleId, currentPage),
    select: (data) => {
      const lessonsList = getLessonsList(get(data, "data.data.data", []));

      return {
        data: lessonsList,
        paginationInfo: get(data,"data.data.meta.pagination",initialData.paginationInfo),
      };
    },
  });

  

  return {
    ...data,
    ...args,
  };
};
