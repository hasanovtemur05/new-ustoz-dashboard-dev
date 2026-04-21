import http from 'services/api';
import { ICreateHolidayForm } from './types';

// =======================  GET API  =======================
export const GetDatasList = async () => {
  return await http.get(`/calendar/holidays`);
};


// =======================  POST API  =======================
export const CreateData = async (values: ICreateHolidayForm | FormData) => {
  const config = values instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  return await http.post(`/calendar/holidays`, values, config);
};


// =======================  PATCH API  =======================
export const EditData = async ({ values, id }: { values: ICreateHolidayForm | FormData; id: string }) => {
  const config = values instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  return await http.patch(`/calendar/holidays/${id}`, values, config);
};


// =======================  DELETE API  =======================
export const DeleteData = async (id: string) => {
  return await http.delete(`/calendar/holidays/${id}`);
};
