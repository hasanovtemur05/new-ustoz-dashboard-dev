import http from 'services/api';
import { IRewardPromocodeInput, IRewardPromocodeEditBody } from './types';

export const GetDatasList = async () => {
  return await http.get(`/course/reward/promocodes`);
};

export const GetFortunaPromocodeDatasList = async () => {
  return await http.get(`/course/reward/templates`, { params: { type: 'PROMOCODE' } });
};

export const CreateData = async (values: IRewardPromocodeInput) => {
  return await http.post(`/course/reward/template`, values);
};

export const GenerateData = async (count: number) => {
  return await http.post(`/promocode/generate/${count}`);
};

export const EditData = async ({ values, id }: IRewardPromocodeEditBody & { id: string }) => {
  return await http.patch(`/course/reward/template/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/course/reward/template/${id}`);
};
