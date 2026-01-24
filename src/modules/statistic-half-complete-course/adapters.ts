import { IUserHalfCompleteCourse } from './types';

export const getData = (item?: IUserHalfCompleteCourse) => {
  return {
    id: item?.id ?? '',
    firstname: item?.firstname ?? '',
    lastname: item?.lastname ?? '',
    phone: item?.phone ?? '',
    email: item?.email ?? '',
    address: item?.address ? `${item.address.region}, ${item.address.district}, ${item.address.neighborhood}` : '',
    courses: item?.courses?.length
      ? item.courses.map((c) => ({
          id: c.id,
          title: c.title,
          totalLessons: c.totalLessons,
          completedLessons: c.completedLessons,
          completionPercentage: c.completionPercentage,
        }))
      : [],
  };
};

export const getDatasList = (data?: IUserHalfCompleteCourse[]) => {
  return data?.length ? data.map((item) => getData(item)) : [];
};
