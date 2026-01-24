import http from 'services/api';
import { ISurveyInput, ISurveyEditBody } from './types';

export const GetDatasList = async (pageSize: number) => {
  return await http.get(`/survey?pageSize=${pageSize}`);
};

export const CreateData = async (values: ISurveyInput) => {
  return await http.post(`/survey`, values);
};

export const EditData = async ({ values, id }: ISurveyEditBody) => {
  return await http.patch(`/survey/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/survey/${id}`);
};
