import http from 'services/api';
import { FortunaProductInputType, ProductEditBodyType } from './types';

export const GetDatasList = async (pageSize:number ) => {
  return await http.get(`/fortuna/admin?pageSize=${pageSize}`);
};

export const CreateData = async (values: FortunaProductInputType) => {
  return await http.post(`/fortuna/product`, values);
};

export const EditData = async ({ values, id }: ProductEditBodyType) => {
  return await http.patch(`/fortuna/product/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/fortuna/product/${id}`);
};
