import { Lesson, LessonLinkType } from './types';
export const getLesson = (item?: Lesson) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    description: item?.description ?? '',
    link: item?.link ?? '',
    moduleId: item?.moduleId ?? '',
    duration: item?.duration ?? 0,
    linkType: item?.linkType ?? LessonLinkType.YOU_TUBE,
    orderId: item?.orderId ?? 0,
    isSoon: item?.isSoon ?? false,
    isActive: item?.isActive ?? false,
  };
};

export const getLessonsList = (data?: Lesson[]) => {
  return data?.length
    ? data.map((item) => {
        return getLesson(item);
      })
    : [];
};
