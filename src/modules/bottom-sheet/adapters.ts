import { BottomSheetCreateType } from "./types";

export const getData = (item?: BottomSheetCreateType) => {
  return {
    id: item?.id ?? '',
    photo: item?.photo ?? '',
    promocodeId: item?.promocodeId ?? '',
    isActive: item?.isActive ?? true,
  };
};

export const getDatasList = (data?: BottomSheetCreateType[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
