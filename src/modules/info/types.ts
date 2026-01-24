export interface InfoType {
  id: string;
  title: string;
  url?: string;
  photo?: string;
  course?: string;
  date: string;
}

export interface InfoInput {
  title: string;
  url?: string;
  photo?: string;
  course?: string | null;
}

export interface InfoEditBody {
  id: string;
  values: InfoInput;
}

