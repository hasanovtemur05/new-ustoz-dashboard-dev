import { IUserCertificate } from './types';
export const getData = (item?: IUserCertificate) => {
  return {
    id: item?.id ?? '',
    file: item?.file ?? '',
    user: item?.user ? item?.user : null,
    course: item?.course ? item?.course : null,
  };
};

export const getDatasList = (data?: IUserCertificate[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
