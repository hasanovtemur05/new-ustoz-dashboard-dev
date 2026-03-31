import http from 'services/api';
import { SuggestionDepartmentInputType, SuggestionDepartmentEditBodyType } from './types';

export const GetDatasList = async () => {
  return await http.get(`/suggestion/departments`);
};

export const CreateData = async (values: SuggestionDepartmentInputType) => {
  return await http.post(`/suggestion/departments`, values);
};

export const EditData = async ({ values, id }: SuggestionDepartmentEditBodyType) => {
  return await http.patch(`/suggestion/departments/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/suggestion/departments/${id}`);
};
