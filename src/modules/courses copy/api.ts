import http from 'services/api';
import type { CourseEditBody, CourseInput } from './types';

export const GetCoursesList = async (pageNumber?: number) => {
  return await http.get(`/course/`, { params: { pageSize: 100, pageNumber } });
};

export const CreateCourse = async (values: CourseInput) => {
  const endpoint = values.pricingType === 'PAID' ? '/course/pro' : '/course/';
  return await http.post(endpoint, values);
};

export const EditCourse = async ({ values, id }: CourseEditBody) => {
  const endpoint = values.pricingType === 'PAID' ? `/course/pro/${id}` : `/course/${id}`;
  return await http.patch(endpoint, values);
};

export const DeleteCourse = async (id: string) => {
  return await http.delete(`/course/${id}`);
};
