import { IPromocode, DiscountEnum } from "./types";
export const getPromocode = (item?: IPromocode) => {
  return {
    id: item?.id ?? "",
    code: item?.code ?? "",
    startDate: item?.startDate ?? "",
    endDate: item?.endDate ?? "",
    maxUses: item?.maxUses ?? 0,
    minOrderValue: item?.minOrderValue ?? 0,
    userLimit: item?.userLimit ?? 0,
    discountValue: item?.discountValue ?? 0,
    discountType: item?.discountType ?? DiscountEnum.EMPTY,
  };
};

export const getPromocodesList = (data?: IPromocode[]) => {
  return data?.length
    ? data.map((item) => {
        return getPromocode(item);
      })
    : [];
};
