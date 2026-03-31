import http from 'services/api';

export const GetDatasList = async () => {
  return await http.get(`/course/reward/promocodes`);
};

export const GetFortunaPromocodeDatasList = async () => {
  return await http.get(`/course/reward/templates`, { params: { type: 'PROMOCODE' } });
};

export const CreateData = async (formData: FormData) => {
  return await http.post(`/course/reward/promocode`, formData);
};

export const GenerateData = async (count: number) => {
  return await http.post(`/promocode/generate/${count}`);
};

export const EditData = async ({ values, id }: { values: FormData; id: string }) => {
  // It seems for promocodes, editing is also just uploading a new file to the rewardId
  return await http.post(`/course/reward/promocode`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/course/reward/template/${id}`);
};

export const UploadPromocodeFile = async (rewardId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('rewardId', rewardId);
  return await http.post(`/course/reward/promocode`, formData);
};

