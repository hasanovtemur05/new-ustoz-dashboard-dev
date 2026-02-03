import http from 'services/api';
import { ICourseAssistantInput, ICourseAssistantEdit } from './types';

export const GetDatasList = async (currentPage: number) => {
  return await http.get(`/course-assistants?pageSize=10`, { params: { pageNumber: currentPage } });
};

export const CreateData = async (values: ICourseAssistantInput) => {
  return await http.post(`/course-assistants`, values);
};

export const EditData = async ({ values, id }: ICourseAssistantEdit) => {
  return await http.patch(`/course-assistants/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/course-assistants/${id}`);
};
