import { Option, Question, BattleQuiz } from './types';

export const getQuiz = (item?: BattleQuiz) => {
  return {
    id: item?.id ?? '',
    question: item?.question ?? '',
    courseId: item?.courseId ?? '',
    options: item?.options?.length ? item.options.map((option) => getOptionsList(option)) : [],
  };
};

export const getQuizzesList = (data?: BattleQuiz[]) => {
  return data?.length
    ? data.map((item) => {
        return getQuiz(item);
      })
    : [];
};

function getQuestionsList(item: Question) {
  return {
    id: item?.id ?? '',
    value: item?.value ?? '',
  };
}

function getOptionsList(item: Option) {
  return {
    value: item?.value ?? '',
    isCorrect: item?.isCorrect ?? false,
  };
}
