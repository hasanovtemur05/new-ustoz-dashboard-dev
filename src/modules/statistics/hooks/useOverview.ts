

import { useQuery } from "@tanstack/react-query"
import { get } from "lodash"
import { GetOverview } from "../api"
import type { IOwerviewData } from "../types"

// Define the actual API response structure
interface ApiResponse {
  data: {
    data: IOwerviewData
  }
}

export const useOverview = () => {
  const { data, ...args } = useQuery<ApiResponse, Error, IOwerviewData>({
    queryKey: ["overview"],
    queryFn: () => GetOverview(),
    select: (data) => {
      // Extract the IOwerviewData from the nested structure
      return get(data, "data.data") as IOwerviewData
    },
  })

  return {
    data,
    ...args,
  }
}

