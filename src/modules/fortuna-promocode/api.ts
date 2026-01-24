import http from 'services/api';
import { IMarketPromocodeInput, IMarketPromocodeEditBody } from './types';

export const GetDatasList = async () => {
  return await http.get(`/fortuna/promocode`);
};

export const GetFortunaPromocodeDatasList = async () => {
  return await http.get(`/fortuna/promocode/product`);
};

export const CreateData = async (values: IMarketPromocodeInput) => {
  return await http.post(`/fortuna/promocode`, values);
};

export const GenerateData = async (count: number) => {
  return await http.post(`/promocode/generate/${count}`);
};

export const EditData = async ({ values }: IMarketPromocodeEditBody) => {
  return await http.patch(`/fortuna/promocode`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/fortuna/promocode/${id}`);
};
