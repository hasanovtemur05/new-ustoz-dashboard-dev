import http from 'services/api';
import { StoryInputType, StoryEditBodyType } from './types';

export const GetDatasList = async () => {
  return await http.get(`/story`);
};

export const CreateData = async (values: StoryInputType) => {
  return await http.post(`/story`, values);
};

export const EditData = async ({
  values,
  id,
}: StoryEditBodyType) => {
  return await http.patch(`/story/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/story/${id}`);
};
