import http from 'services/api';
import { BottomSheetCreateType, BottomSheetEditBody } from './types';

interface GetDatasListParams {
  pageNumber?: number;
  pageSize?: number;
  isActive?: boolean;
}

export const GetDatasList = async (
  params: GetDatasListParams = {}
): Promise<any> => {
  const res = await http.get<any>(
    '/bottom/sheet',
    { params }
  );
  return res?.data;
};

export const CreateData = async (payload: BottomSheetCreateType | FormData) => {
  const config = payload instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  return await http.post(`/bottom/sheet`, payload, config);
};

export const EditData = async ({ payload, id }: BottomSheetEditBody) => {
  // Agar FormData bo'lsa, multipart/form-data headerini avtomatik qo'shadi
  const config = payload instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  return await http.patch(`/bottom/sheet/${id}`, payload, config);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/bottom/sheet/${id}`);
};