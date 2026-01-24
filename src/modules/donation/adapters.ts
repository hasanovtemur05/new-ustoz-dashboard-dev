import { Donation } from './types';
export const getData = (item?: Donation) => {
  console.log(item?.user);

  return {
    id: item?.id ?? '',
    amount: item?.amount ?? 0,
    transaction: item?.transaction ?? null,
    user: item?.user ? item?.user : null,
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: Donation[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
