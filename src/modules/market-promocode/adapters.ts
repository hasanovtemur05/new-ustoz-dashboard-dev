import { IMarketPromocode } from './types';
export const getData = (item?: IMarketPromocode) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    total: item?.total ?? 0,
    unused: item?.unused ?? 0,
  };
};

export const getDatasList = (data?: IMarketPromocode[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
