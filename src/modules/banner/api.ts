import http from 'services/api';
import { BannerInputType, BannerEditBodyType } from './types';

export const GetDatasList = async () => {
  return await http.get(`/banner`);
};

export const CreateData = async (values: BannerInputType) => {
  return await http.post(`/banner`, values);
};

export const EditData = async ({
  values,
  id,
}: BannerEditBodyType) => {
  return await http.patch(`/banner/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/banner/${id}`);
};
