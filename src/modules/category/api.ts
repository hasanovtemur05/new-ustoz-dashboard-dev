import http from 'services/api';
import { CategoryInputType, CategoryEditBodyType } from './types';

export const GetDatasList = async (pageNumber: number) => {
  return await http.get(`/product-category`, { params: { pageNumber } });
};

export const CreateData = async (values: CategoryInputType) => {
  return await http.post(`/product-category`, values);
};

export const EditData = async ({ values, id }: CategoryEditBodyType) => {
  return await http.patch(`/product-category/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/product-category/${id}`);
};
