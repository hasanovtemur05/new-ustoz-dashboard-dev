import { IHolidaysTypes, IHolidayTranslation } from "./types";

// ======================= TRANSLATION ADAPTERS =======================
export const getTranslation = (item?: IHolidayTranslation) => {
  return {
    id: item?.id ?? '',
    language: item?.language ?? '',
    name: item?.name ?? '',
  };
};

export const getTranslationsList = (data?: IHolidayTranslation[]) => {
  return data?.length
    ? data.map((item) => getTranslation(item))
    : [];
};





// =======================  HOLIDAY ADAPTERS  =======================
export const getHoliday = (item?: IHolidaysTypes) => {
  return {
    id: item?.id ?? '',
    photo: item?.photo ?? '',
    day: item?.day ?? 0,
    month: item?.month ?? 0,
    region: item?.region ?? '',

    translations: getTranslationsList(item?.translations),
    createdAt: item?.createdAt ?? '',
    updatedAt: item?.updatedAt ?? '',
  };
};

export const getHolidaysList = (data?: IHolidaysTypes[]) => {
  return data?.length
    ? data.map((item) => getHoliday(item))
    : [];
};
