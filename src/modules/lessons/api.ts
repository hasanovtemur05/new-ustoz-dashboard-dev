import http from 'services/api';
import { LessonInput, LessonEditBody } from './types';

export const GetLessonsList = async (moduleId: string, currentPage: number) => {
  return await http.get(`/lesson`, { params: { moduleId: moduleId, pageNumber: currentPage } });
};
// for rewards
export const GetCourseLessonsList = async (courseId: string) => {
  return await http.get(`/lesson/reward/${courseId}`);
};

export const CreateLesson = async (values: LessonInput) => {
  return await http.post(`/lesson/`, values);
};

export const EditLesson = async ({ values, id }: LessonEditBody) => {
  return await http.patch(`/lesson/${id}`, values);
};

export const DeleteLesson = async (id: string) => {
  return await http.delete(`/lesson/${id}`);
};
