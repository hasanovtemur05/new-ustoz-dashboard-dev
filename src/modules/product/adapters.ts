import { ProductType } from "./types";

export const getData = (item?: ProductType) => {
  return {
    id: item?.id ?? "",
    photo: item?.photo ?? "",
    photos: item?.photos ?? [],
    title: item?.title ?? "",
    content: item?.content ?? "",
    price: item?.price ?? 0,
    cashPrice: item?.cashPrice ?? 0,
    count: item?.count ?? 0,
    isActiveOnGift: item?.isActiveOnGift ?? false,
    categoryId: item?.categoryId ?? "",
    isActive: item?.isActive ?? false,
    workingHours: item?.workingHours ?? [],
    createdAt: item?.createdAt ?? "",
    type: item?.type ?? "PHYSICAL",
    openAiAssistantId: item?.openAiAssistantId ?? "",
  };
};

export const getDatasList = (data?: ProductType[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
