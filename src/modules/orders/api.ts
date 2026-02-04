import http, { httpV2 } from 'services/api';
import { IOrderInput } from './types';

interface OrderFilters {
  type: string;
  status?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

export const GetDatasList = async (currentPage: number, filters: OrderFilters) => {
  const params = new URLSearchParams({
    pageSize: '10',
    pageNumber: currentPage.toString(),
    type: filters.type,
  });

  if (filters.status) params.append('status', filters.status);
  if (filters.firstname) params.append('firstname', filters.firstname);
  if (filters.lastname) params.append('lastname', filters.lastname);
  if (filters.phone) params.append('phone', filters.phone);

  return await http.get(`/order?${params.toString()}`);
};

export const EditData = async ({ status, id }: IOrderInput) => {
  return await http.patch(`/order/${id}`, { status });
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/order/${id}`);
};

export const CancelData = async (id: string) => {
  return await http.delete(`/order/cancel/${id}`);
};

export const SearchUserId = async (search: string) => {
  return await http.get(`/users?search=${search}`);
};

export const SearchCourseId = async (search: string) => {
  return await httpV2.get(`/course?search=${search}`);
}

export const CreateEnrollmet = async (courseId: string, userId: string) => {
  return await http.post(`/enrollment`, { courseId, userId });
}