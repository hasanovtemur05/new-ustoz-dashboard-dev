
// =======================  GET TYPES  =======================
export interface TranslationTypes {
    id: string;
    language: string;
    name: string
}


export interface IHolidaysTypes {
  id: string;
  photo: string;
  day: number;
  month: number;
  region: string;
  translations?: TranslationTypes[];
  createdAt: string;
  updatedAt: string;
}

// =======================  POST & PATCH TYPES  =======================

export interface IHolidayTranslation {
  id: string;
  language: string;
  name: string;
} 

export interface ICreateHolidayForm {
  photo?: File | null; 
  day: number;
  month: number;
  region: string;
  translations: IHolidayTranslation[]; 
}



