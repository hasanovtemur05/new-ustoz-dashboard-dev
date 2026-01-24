import { Vacancy, VacancyType } from "./types";
export const getVacancy = (item?: Vacancy) => {
  return {
    id: item?.id ?? "",
    description: item?.description ?? "",
    title: item?.title ?? "",
    company: item?.company ?? "",
    address: item?.address ?? "",
    salary: item?.salary ?? 0,
    fromExperience: item?.fromExperience ?? 0,
    toExperience: item?.toExperience ?? 0,
    type: item?.type ?? VacancyType.EMPTY,
    skills: item?.skills ?? [""]
  };
};

export const getVacanciesList = (data?: Vacancy[]) => {
  return data?.length
    ? data.map((item) => {
        return getVacancy(item);
      })
    : [];
};
