import { Module } from './types';
export const getModule = (item?: Module) => {
  console.log(item);
  
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    courseId: item?.courseId ?? '',
    degree: item?.degree ?? '',
    isActive: item?.isActive ?? false,
  };
};

export const getModulesList = (data?: Module[]) => {
  return data?.length
    ? data.map(item => {
      return getModule(item);
    })
    : [];
};
