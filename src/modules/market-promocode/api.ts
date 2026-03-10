import http from 'services/api';
import { IMarketPromocodeInput, IMarketPromocodeEditBody, PromocodeGenerate } from './types';

export const GetDatasList = async () => {
  return await http.get(`/market-promocode`);
};

export const CreateData = async (values: IMarketPromocodeInput) => {
  return await http.post(`/market-promocode`, values);
};
export const GenerateData = async (payload: PromocodeGenerate) => {
  return await http.post(`/promocode/generate`, payload);
};

export const EditData = async ({ values, id }: IMarketPromocodeEditBody) => {
  return await http.patch(`/banner/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/banner/${id}`);
};
