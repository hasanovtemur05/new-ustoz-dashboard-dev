import http from 'services/api';
import { News, NewsEditBody, NewsInput } from './types';

export const GetNewsList = async (currentPage: number) => {
  return await http.get(`/news?pageNumber=${currentPage}`);
};

export const CreateNews = async (values: NewsInput) => {
  return await http.post<{ data: News }>(`/news/`, values);
};

export const EditNews = async ({ values, id }: NewsEditBody) => {
  return await http.patch(`/news/${id}`, values);
};

export const DeleteNews = async (id: string) => {
  return await http.delete(`/news/${id}`);
};
