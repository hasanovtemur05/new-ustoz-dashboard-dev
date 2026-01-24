import http from 'services/api';
import { CourseEditBody, CourseInput } from './types';

export const GetCoursesList = async (pageNumber?: number) => {
  return await http.get(`/course/`, { params: { pageSize: 100, pageNumber } });
};

export const CreateCourse = async (values: CourseInput) => {
  return await http.post(`/course/`, values);
};

export const EditCourse = async ({ values, id }: CourseEditBody) => {
  return await http.patch(`/course/${id}`, values);
};

export const DeleteCourse = async (id: string) => {
  return await http.delete(`/course/${id}`);
};
