import { Course } from './types';
export const getCourse = (item?: Course) => {
  return {
    id: item?.id ?? '',
    slug: item?.slug ?? '',
    title: item?.title ?? '',
    description: item?.description ?? '',
    icon: item?.icon ?? '',
    planLessonCount: item?.planLessonCount ?? 0,
    // duration: item?.duration ?? 0,
    type: item?.type ?? "",
    degree: item?.degree ?? "",
    teacherId: item?.teacherId ?? "",
    banner: item?.banner ?? "",
    seoKeywords: item?.seoKeywords ?? [""],
    seo:item?.seo ? item?.seo : null
  };
};


export const getCoursesList = (data?: Course[]) => {
  return data?.length
    ? data.map(item => {
      return getCourse(item);
    })
    : [];
};
