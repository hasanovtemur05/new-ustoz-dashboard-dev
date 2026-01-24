import { CertificateType } from './types';
import { RecommendationType } from './types';
export const getData = (item: CertificateType) => ({
  id: item.id, // har doim mavjud
  photo: item.photo,
  course: item.course,
  courseId: item.courseId,
  date: item.date,
  degree: item.degree,
});

export const getDatasList = (data?: CertificateType[]) => {
  return data?.length
    ? data.map(item => {
      return getData(item);
    })
    : [];
};


export const getData2 = (item: RecommendationType) => ({
  id: item.id, // har doim mavjud
  photo: item.photo,
  type: item.type,
  createdAt: item.createdAt,
  course: item.course,
});

export const getRecomList = ( data?: RecommendationType[] ) => {
  return data?.length
  ? data.map(item => {
    return getData2(item);
  })
  : [];
};