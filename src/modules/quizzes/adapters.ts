import {  Option,  Question,  Quiz, QuizOptionType } from "./types"

export const getQuiz = (item?: Quiz) => {
  return {
    id: item?.id ?? "",
    question: item?.question ?? "",
    courseId: item?.courseId ?? "",
    type: item?.type ?? QuizOptionType.TEXT, 
    options: item?.options?.length ? item.options.map((option:Option) => getOptionsList(option)) : [],
  }
}

export const getQuizzesList = (data?: Quiz[]) => {
  return data?.length
    ? data.map((item) => {
        return getQuiz(item)
      })
    : []
}



function getOptionsList(item: Option) {
  return {
    type: item?.type ?? QuizOptionType.TEXT,
    value: item?.value ?? "",
    audioLink: item?.audioLink ?? "",
    imageLink: item?.imageLink ?? "",
    isCorrect: item?.isCorrect ?? false,
  }
}


// import {
//   Option,
//   Question,
//   Quiz,
// } from './types';

// export const getQuiz = (item?: Quiz) => {
//   return {
//     id: item?.id ?? '',
//     question: item?.question ?? "",
//     courseId: item?.courseId ?? "",
//     options: item?.options?.length
//       ? item.options.map(option => getOptionsList(option))
//       : [],
//   };
// };

// export const getQuizzesList = (data?: Quiz[]) => {
//   return data?.length
//     ? data.map(item => {
//       return getQuiz(item);
//     })
//     : [];
// };

// function getQuestionsList(item: Question) {
//   return {
//     id: item?.id ?? '',
//     value: item?.value ?? '',
//   };
// }

// function getOptionsList(item: Option) {
//   return {
//     value: item?.value ?? '',
//     isCorrect: item?.isCorrect ?? false,
//   };
// }

