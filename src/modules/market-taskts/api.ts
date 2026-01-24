import http from 'services/api';
import { IMarketTaskInput, IMarketTaskEditBody } from './types';

export const GetDatasList = async (pageSize: number) => {
  return await http.get(`/market/tasks?pageSize=${pageSize}`);
};

export const CreateData = async (values: IMarketTaskInput) => {
  return await http.post(`/market/tasks`, values);
};

export const EditData = async ({ values, id }: IMarketTaskEditBody) => {
  return await http.patch(`/market/tasks/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/market/tasks/${id}`);
};

export const GetSurveyList = async () => {
  return await http.get(`/survey`);
};
