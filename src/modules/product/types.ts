import { CategoryType } from "modules/category/types";

export interface WorkingHourType {
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  open: string;
  close: string;
}

export type ProductKind = 'PHYSICAL' | 'AI_ASSISTANT' | 'PROMOCODE';

export interface ProductType {
  id: string;
  title: string;
  content: string;
  photo: string;
  price: number;
  cashPrice?: number;
  count: number;
  isActiveOnGift?: boolean;
  categoryId: any | CategoryType;
  isActive: boolean;
  photos?: { id: string; photo: string }[];
  workingHours?: WorkingHourType[];
  createdAt?: string;
  type?: ProductKind;
  openAiAssistantId?: string;
}

export interface ProductInputType {
  title: string;
  content: string;
  photo: string;
  photos: string[];
  price: number;
  cashPrice?: number;
  count: number;
  isActiveOnGift?: boolean;
  categoryId: any | CategoryType;
  isActive: boolean;
  workingHours?: WorkingHourType[];
  type: ProductKind;
  openAiAssistantId?: string;
}

export interface ProductFileType extends ProductInputType {
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
}

export interface ProductEditBodyType {
  id: string;
  values: Partial<ProductInputType>;
}
