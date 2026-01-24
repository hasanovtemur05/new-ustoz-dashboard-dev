export interface News {
  id: string;
  title: string;
  content: string;
  photo: string;
  createdAt: string;
}

export interface NewsInput {
  title: string;
  content: string;
  photo: string;
}

export interface NewsEditBody {
  id: string;
  values: NewsInput;
}
