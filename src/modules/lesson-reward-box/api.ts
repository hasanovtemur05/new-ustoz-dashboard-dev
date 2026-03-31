import http from 'services/api';
import { ILessonRewardBox, ILessonRewardBoxInput, ILessonRewardBoxEdit, ILessonRewardBoxItemInput, IClaimBoxInput } from './types';

export const GetBoxesList = async (courseId: string) => {
  const { data } = await http.get<{ data: ILessonRewardBox[] }>(`/course/reward/boxes`, { params: { courseId } });
  return data.data;
};

export const CreateBox = async (values: ILessonRewardBoxInput) => {
  return await http.post(`/course/reward/box`, values);
};

export const EditBox = async (id: string, values: ILessonRewardBoxEdit) => {
  return await http.patch(`/course/reward/box/${id}`, values);
};

export const DeleteBox = async (id: string) => {
  return await http.delete(`/course/reward/box/${id}`);
};

export const AddItemToBox = async (boxId: string, values: ILessonRewardBoxItemInput) => {
  return await http.post(`/course/reward/box/${boxId}/item`, values);
};

export const DeleteBoxItem = async (itemId: string) => {
  return await http.delete(`/course/reward/box/item/${itemId}`);
};

export const ClaimBox = async (values: IClaimBoxInput) => {
  return await http.post(`/course/reward/box/claim`, values);
};
