import http from 'services/api';
import { QuizEditBody, BattleQuizInput } from './types';

export const GetQuizzesList = async (lessonId: string, pageNumber: number) => {
  return await http.get(`/battle-game?pageSize=25`, { params: { courseId: lessonId, pageNumber } });
};

export const CreateQuiz = async (values: BattleQuizInput) => {
  return await http.post(`/battle-game/`, values);
};

export const EditQuiz = async ({ values, id }: QuizEditBody) => {
  return await http.patch(`/battle-game/${id}`, values);
};

export const DeleteQuiz = async (id: string) => {
  return await http.delete(`/battle-game/${id}`);
};
