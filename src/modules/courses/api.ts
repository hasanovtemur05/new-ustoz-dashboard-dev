import  { httpV2 } from 'services/api';
import type { CourseEditBody, CourseInput } from './types';

export const GetCoursesList = async (pageNumber?: number) => {
  return await httpV2.get(`/course/`, { params: { pageSize: 100, pageNumber } });
};

export const CreateCourse = async (values: CourseInput) => {
  return await httpV2.post('/course/', values);
};

export const EditCourse = async ({ values, id }: CourseEditBody) => {
  return await httpV2.patch(`/course/${id}`, values);
};

export const DeleteCourse = async (id: string) => {
  return await httpV2.delete(`/course/${id}`);
};
