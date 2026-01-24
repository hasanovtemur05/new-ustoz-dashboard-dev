import http from 'services/api';
import { TeacherInputType, TeacherEditBodyType } from './types';

export const GetDatasList = async (pageNumber: number,pageSize:number) => {
  return await http.get(`/teacher`, { params: { pageNumber,pageSize } });
};

export const CreateData = async (values: TeacherInputType) => {
  return await http.post(`/teacher`, values);
};

export const EditData = async ({ values, id }: TeacherEditBodyType) => {
  return await http.patch(`/teacher/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/teacher/${id}`);
};
