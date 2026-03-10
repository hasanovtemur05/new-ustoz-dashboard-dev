import http from 'services/api';
import { Book, BookEditBody, BookInput } from './types';

export const GetBooksList = async (pageNumber: number, pageSize: number) => {
  return await http.get(`/book?pageNumber=${pageNumber}&pageSize=${pageSize}`);
};

export const CreateBook = async (values: BookInput) => {
  return await http.post<{ data: Book }>(`/book/`, values);
};

export const EditBook = async ({ values, id }: BookEditBody) => {
  return await http.patch(`/book/${id}`, values);
};

export const DeleteBook = async (id: string) => {
  return await http.delete(`/book/${id}`);
};
