import { Vacancy, VacancyType } from "./types";
export const getVacancy = (item?: any): Vacancy => {
  return {
    id: item?.id ?? "",
    type: item?.type ?? "",
    title: item?.title ?? "",
    specialization: item?.specialization ?? "",
    address: {
      id: item?.address?.id ?? "",
      region: item?.address?.region ?? "",
      district: item?.address?.district ?? "",
    },
    salaryFrom: item?.salaryFrom ?? 0,
    salaryTo: item?.salaryTo ?? 0,
    workSchedule: item?.workSchedule ?? "",
    experience: item?.experience ?? "",
    status: item?.status ?? "",
    createdAt: item?.createdAt ?? "",
    company: item?.company ?? "",
    description: item?.description ?? "",
    skills: item?.skills ?? []
  };
};

export const getVacanciesList = (data?: Vacancy[]) => {
  return data?.length
    ? data.map((item) => {
        return getVacancy(item);
      })
    : [];
};
