import http from 'services/api';
import { CreateBannerPhotoPayload } from './types';

export const GetBannerPhotos = async (pageNumber: number = 1, pageSize: number = 10, whereIs?: string) => {
  return await http.get(`/additional-photo`, {
    params: {
      pageNumber,
      pageSize,
      whereIs,
    },
  });
};

export const CreateBannerPhoto = async (payload: CreateBannerPhotoPayload) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('whereIs', payload.whereIs);
  formData.append('photo', payload.photo);

  return await http.post(`/additional-photo`, formData);
};

export const UpdateBannerPhoto = async (id: string, payload: any) => {
  const formData = new FormData();
  if (payload.title) formData.append('title', payload.title);
  if (payload.whereIs) formData.append('whereIs', payload.whereIs);
  if (payload.photo instanceof File) {
    formData.append('photo', payload.photo);
  }

  return await http.patch(`/additional-photo/${id}`, formData);
};

export const DeleteBannerPhoto = async (id: string) => {
  return await http.delete(`/additional-photo/${id}`);
};
