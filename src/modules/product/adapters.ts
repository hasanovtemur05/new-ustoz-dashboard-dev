import { ProductType } from "./types";
export const getData = (item?: ProductType) => {
  return {
    id: item?.id ?? "",
    photo: item?.photo ?? "",
    photos: item?.photos ?? [
      {
        id: "",
        photo: "",
      },
    ],
    title: item?.title ?? "",
    content: item?.content ?? "",
    price: item?.price ?? 0,
    count: item?.count ?? 0,
    categoryId: item?.categoryId ?? "",
    isActive: item?.isActive ?? false,
    date: item?.date ?? "",
  };
};

export const getDatasList = (data?: ProductType[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
