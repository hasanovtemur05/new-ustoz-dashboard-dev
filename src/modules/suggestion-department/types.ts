export interface SuggestionDepartmentType {
  id: string;
  title: string;
  icon: string;
  userId: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
}

export interface SuggestionDepartmentInputType {
  title: string;
  icon: string;
  userId: string;
  order?: number;
}

export interface SuggestionDepartmentEditBodyType {
  id: string;
  values: Partial<SuggestionDepartmentType>;
}
