import { SurveyContext } from './constants';

export interface ISurvey {
  id: string;
  title: string;
  question: string;
  context: SurveyContext;
  points?: number;
  options?: string[];
  courseId?: string;
  lessonId?: string;
  createdAt: string;
}

export interface ISurveyInput {
  title: string;
  question: string;
  context: SurveyContext;
  points?: number;
  options?: string[];
  courseId?: string;
  lessonId?: string;
}

export interface ISurveyEditBody {
  id: string;
  values: ISurveyInput;
}
