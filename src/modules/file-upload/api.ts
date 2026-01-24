import http from 'services/api';

export const FileUpload = async (file: FormData, url: string) => {
  return await http.post(url, file);
};
