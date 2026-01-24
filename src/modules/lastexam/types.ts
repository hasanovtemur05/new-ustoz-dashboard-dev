
export interface Question {
  id: string;
  value: string;
}



export interface Option {
  value: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  courseId: string;
  question:string;
  options: Option[];
}

export interface QuizInput {
  courseId: string;
  question: string;
  options: Option[];
}

export interface QuizEditBody {
  id: string;
  values: QuizInput;
}
