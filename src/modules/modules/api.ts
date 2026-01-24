import http from 'services/api';
import { ModuleEditBody, ModuleCreateInput } from './types';

export const GetModulesList = async (courseId: string) => {
  return await http.get(`/module`, {params: {courseId: courseId}});
};

export const CreateModule = async (values: ModuleCreateInput) => {
  return await http.post(`/module/`, values);
};

export const EditModule = async ({ values, id }: ModuleEditBody) => {
  return await http.patch(`/module/${id}`, values);
};

export const DeleteModule = async (id: string) => {
  return await http.delete(`/module/${id}`);
};
