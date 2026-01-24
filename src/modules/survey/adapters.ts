import { ISurvey } from './types';
import { SurveyContext } from './constants';

export const getData = (item?: ISurvey): ISurvey => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    question: item?.question ?? '',
    context: item?.context ?? SurveyContext.GENERAL,
    points: item?.points,
    options: item?.options ?? [],
    courseId: item?.courseId,
    lessonId: item?.lessonId,
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: ISurvey[]): ISurvey[] => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
