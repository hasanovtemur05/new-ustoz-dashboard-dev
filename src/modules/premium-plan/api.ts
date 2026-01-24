import http from 'services/api';
import { PremiumPlanInputType, PremiumPlanEditBodyType } from './types';

export const GetDatasList = async (currentPage: number, limit: number) => {
  return await http.get(`/premium-plan?pageNumber=${currentPage}&pageSize=${limit}`);
};

export const CreateData = async (values: PremiumPlanInputType) => {
  return await http.post(`/premium-plan`, values);
};

export const EditData = async ({ values, id }: PremiumPlanEditBodyType) => {
  return await http.patch(`/premium-plan/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/premium-plan/${id}`);
};
