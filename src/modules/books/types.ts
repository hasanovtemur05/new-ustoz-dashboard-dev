

export interface Book {
  id: string;
  name: string;
  photo: string;
  file: string;
  pagesCount: number;
  description: string;
  createdAt: string;
}

export interface BookInput {
  name: string;
  photo: string;
  file: string;
  pagesCount: number;
  description: string;
  createdAt?: string;
}

export interface BookEditBody {
  id: string;
  values: BookInput;
}
