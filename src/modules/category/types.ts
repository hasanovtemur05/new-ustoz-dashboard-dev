export interface CategoryType {
  id: string;
  title: string;
  isActive: boolean,
  date: string
}


export interface CategoryInputType {
  title: string;
  isActive: boolean,
}

export interface CategoryEditBodyType {
  id: string;
  values: CategoryInputType;
}

