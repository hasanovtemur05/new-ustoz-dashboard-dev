import http from 'services/api';
import { ICourseRewardInput, ICourseAssistantEdit } from './types';

export const GetDatasList = async (currentPage: number,courseId:string) => {
  return await http.get(`/course/reward`, { params: { pageNumber: currentPage, courseId } });
};

export const CreateData = async (values: ICourseRewardInput) => {
  return await http.post(`/course/reward`, values);
};

export const EditData = async ({ values, id }: ICourseAssistantEdit) => {
  return await http.patch(`/course/reward/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/course/reward/${id}`);
};
