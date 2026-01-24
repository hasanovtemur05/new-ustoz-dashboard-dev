import { CategoryType } from "modules/category/types";

export interface ProductType {
  id: string;
  title: string;
  content: string;
  photo: string;
  price: number;
  count: number;
  categoryId: any | CategoryType;
  isActive: boolean;
  photos?: { id: string; photo: string }[];
  date: string;
}

export interface ProductInputType {
  title: string;
  content: string;
  photo: string;
  photos: string[];
  price: number;
  count: number;
  categoryId: any | CategoryType;
  isActive: boolean;
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
  values: ProductInputType;
}
