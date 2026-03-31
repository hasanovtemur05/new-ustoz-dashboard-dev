import { SuggestionDepartmentType } from "./types";

export const getData = (item?: SuggestionDepartmentType) => {
  return {
    id: item?.id ?? "",
    title: item?.title ?? "",
    icon: item?.icon ?? "",
    userId: item?.userId ?? "",
    order: item?.order ?? 0,
    isActive: item?.isActive ?? true,
    createdAt: item?.createdAt ?? "",
  };
};

export const getDatasList = (data?: SuggestionDepartmentType[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
