import { ICourseAssistant } from './types';
export const getData = (item?: ICourseAssistant) => {
  return {
    id: item?.id ?? '',
    courseId: item?.courseId ?? '',
    assistantId: item?.assistantId ?? '',
    staticAnimation: item?.staticAnimation ?? '',
    thinkingAnimation: item?.thinkingAnimation ?? '',
    course: item?.course ?? null,
  };
};

export const getDatasList = (data?: ICourseAssistant[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
