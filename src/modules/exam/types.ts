export interface ExamOptions {
  value: string;
  is_correct: boolean;
}

export interface ExamType {
  id: string;
  question: string;
  course?: string;
  options: ExamOptions[];
}



export interface ExamInputType {
  question: string;
  course?: string;
  options: ExamOptions[];

}

export interface ExamEditBodyType {
  id: string;
  values: ExamInputType;
}

