import http from 'services/api';
import { NotificationEditBody, NotificationInput } from './types';

export const GetNotificationsList = async (pageNumber: number, pageSize: number) => {
  return await http.get(`/notification`, { params: { pageNumber, pageSize } });
};

export const GetNotificationsStatisticList = async (pageNumber: number, pageSize: number) => {
  return await http.get(`/notification/all/statistics`, { params: { pageNumber, pageSize } });
};

export const CreateNotification = async (values: NotificationInput) => {
  return await http.post(`/notification`, values);
};

export const EditNotification = async ({ values, id }: NotificationEditBody) => {
  return await http.patch(`/notification/${id}`, values);
};

export const DeleteNotification = async (id: string) => {
  return await http.delete(`/notification/${id}`);
};
