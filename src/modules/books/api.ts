import http from 'services/api';
import { Book, BookEditBody, BookInput } from './types';

export const GetBooksList = async (currentPage: number) => {
  return await http.get(`/books?pageNumber=${currentPage}`);
};

export const CreateBook = async (values: BookInput) => {
  return await http.post<{ data: Book }>(`/books/`, values);
};

export const EditBook = async ({ values, id }: BookEditBody) => {
  return await http.patch(`/books/${id}`, values);
};

export const DeleteBook = async (id: string) => {
  return await http.delete(`/books/${id}`);
};
