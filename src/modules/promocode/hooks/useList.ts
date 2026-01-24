// modules/promocode/hooks/useList.ts
import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { GetPromocodesList } from "../api";
import { getPromocodesList } from "../adapters";

export const usePromocodesList = ({currentPage = 1, isEnabled = true , search = '' }: {currentPage?: number , isEnabled?: boolean, search?: string } = {}) => {
    const initialData = {
      data: getPromocodesList(),
      paginationInfo: null,
    };

  const { data = initialData, ...args } = useQuery({
    queryKey: ["promocodes_list", currentPage, search],
    queryFn: () => GetPromocodesList({ pageNumber: currentPage, pageSize: 10 , search}),
    select: (data) => ({
      data: getPromocodesList(get(data, 'data.data.data')),
      paginationInfo: get(data, 'data.data.meta.pagination', initialData.paginationInfo),
    }),
    enabled: isEnabled

  });

  return {
    ...data,
    ...args
  }
}
