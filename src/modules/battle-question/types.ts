
export interface Question {
  id: string;
  value: string;
}



export interface Option {
  value: string;
  isCorrect: boolean;
}

export interface BattleQuiz {
  id: string;
  courseId: string;
  question:string;
  options: Option[];
}

export interface BattleQuizInput {
  courseId: string;
  question: string;
  options: Option[];
}

export interface QuizEditBody {
  id: string;
  values: BattleQuizInput;
}
