import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { getDatasList } from "../adapters";
import { GetDatasList } from "../api";

export const useDonationsList = (currentPage: number) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ["donation_list", currentPage],
    queryFn: () => GetDatasList(currentPage),
    select: (data) => ({
      data: getDatasList(get(data, "data.data.data")),
      pagenationInfo: get(data, "data.data.meta.pagination"),
    }),
  });
  return {
    ...data,
    ...args,
    // pagenationInfo
  };
};
