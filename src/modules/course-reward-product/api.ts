import http from 'services/api';
import { LessonRewardInputType, LessonRewardEditBodyType } from './types';

export const GetDatasList = async (pageSize: number) => {
  return await http.get(`/course/reward/templates?pageSize=${pageSize}`);
};

export const CreateData = async (values: LessonRewardInputType) => {
  return await http.post(`/course/reward/template`, values);
};

export const EditData = async ({ values, id }: LessonRewardEditBodyType) => {
  return await http.patch(`/course/reward/template/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/course/reward/template/${id}`);
};
