import http from 'services/api';
import { ExamInputType, ExamEditBodyType } from './types';

export const GetDatasList = async (id: string) => {
  return await http.get(`/exam/admin?course=${id}&pageSize=120`);
};

export const CreateData = async (values: ExamInputType) => {
  return await http.post(`/exam`, values);
};

export const EditData = async ({
  values,
  id,
}: ExamEditBodyType) => {
  return await http.patch(`/exam/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/exam/${id}`);
};
