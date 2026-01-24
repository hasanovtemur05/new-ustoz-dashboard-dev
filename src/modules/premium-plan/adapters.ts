import { PremiumPlan } from "./types";
export const getData = (item?: PremiumPlan) => {
  return {
    id: item?.id ?? "",
    title: item?.title ?? "",
    price: item?.price ?? 0,
    durationInDays: item?.durationInDays ?? 0,
    properties: item?.properties ?? [],
    isVisible: item?.isVisible ?? false,
    date: item?.date ?? "",
  };
};

export const getDatasList = (data?: PremiumPlan[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
