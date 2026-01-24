import { DonationStatus, IOrder } from './types';
export const getData = (item?: IOrder) => {
  return {
    id: item?.id ?? '',
    orderId: item?.orderId ?? 0,
    price: item?.price ?? 0,
    comment: item?.comment ?? '',
    user: item?.user ?? null,
    product: item?.product ?? null,
    status: item?.status ?? DonationStatus.PENDING,
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: IOrder[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
