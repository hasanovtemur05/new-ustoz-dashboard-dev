import http from 'services/api';
import { InfoEditBody, InfoInput } from './types';

export const GetInfosList = async () => {
  return await http.get(`/info`);
};

export const CreateInfo = async (values: InfoInput) => {
  return await http.post(`/info`, values);
};

export const EditInfo = async ({
  values,
  id,
}: InfoEditBody) => {
  return await http.patch(`/info/${id}`, values);
};

export const DeleteInfo = async (id: string) => {
  return await http.delete(`/info/${id}`);
};
