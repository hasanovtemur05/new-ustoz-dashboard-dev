import http from 'services/api';
import { ProductInputType, ProductEditBodyType } from './types';

export const GetDatasList = async (
  pageNumber: number = 1,
  pageSize: number = 20,
  categoryId?: string,
  isActiveOnGift?: boolean,
  search?: string,
  isActive?: boolean
) => {
  return await http.get(`/product`, {
    params: {
      pageNumber,
      pageSize,
      categoryId,
      isActiveOnGift,
      search,
      isActive
    }
  });
};

export const GetOneProduct = async (id: string) => {
  return await http.get(`/product/${id}`);
};

export const CreateData = async (values: ProductInputType) => {
  return await http.post(`/product`, values);
};

export const EditData = async ({ values, id }: ProductEditBodyType) => {
  return await http.patch(`/product/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/product/${id}`);
};

export const DeleteProductPhoto = async (photoId: string) => {
  return await http.delete(`/product/photo/${photoId}`);
};

export const ExportBuyers = async (id: string) => {
  return await http.get(`/product/${id}/buyers/export`);
};
