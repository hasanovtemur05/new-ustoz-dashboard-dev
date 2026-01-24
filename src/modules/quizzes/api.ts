import http from 'services/api';
import { QuizEditBody, QuizInput } from './types';

export const GetQuizzesList = async (lessonId: string) => {
  return await http.get(`/quiz/lesson/${lessonId}`);
};

export const GetOneQuizz = async (quizId: string) => {
  return await http.get(`/quiz`, { params: { quizId } });
};
export const CreateQuiz = async (values: QuizInput) => {
  return await http.post(`/quiz/`, values);
};

export const EditQuiz = async ({ values, id }: QuizEditBody) => {
  return await http.patch(`/quiz/${id}`, values);
};

export const DeleteQuiz = async (id: string) => {
  return await http.delete(`/quiz/${id}`);
};
