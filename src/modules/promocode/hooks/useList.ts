import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { getPromocodesList } from "../adapters";
import { GetPromocodesList } from "../api";

export const usePromocodesList = () => {
  const initialData = {
    data: getPromocodesList(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ["promocodes_list"],
    queryFn: () => GetPromocodesList(),
    select: (data) => ({
      data: getPromocodesList(get(data, "data.data.data")),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
