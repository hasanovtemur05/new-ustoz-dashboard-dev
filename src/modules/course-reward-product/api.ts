import http from 'services/api';
import { LessonRewardInputType, LessonRewardEditBodyType } from './types';

export interface GetLessonRewardsQuery {
  pageSize?: number;
  type?: string;
  isPartial?: boolean;
  search?: string;
}

export const GetDatasList = async (params: GetLessonRewardsQuery) => {
  return await http.get(`/course/reward/templates`, { params });
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
