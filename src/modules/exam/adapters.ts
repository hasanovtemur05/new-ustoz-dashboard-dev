import { ExamType } from './types';

export const getData = (item?: ExamType) => {
  return {
    id: item?.id ?? '',
    question: item?.question ?? '',
    course: item?.course ?? '',
    options: item?.options ?? [],
  };
};

export const getDatasList = (data?: ExamType[]) => {
  return data?.length
    ? data.map(item => {
      return getData(item);
    })
    : [];
};
