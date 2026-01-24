
import { PuzzleDifficulty } from 'modules/puzzles/types';
import { QuizContentType, QuizType } from 'modules/quizzes/types';

export const quizSelectType = [
  {
    name: 'Bir tanlovli',
    type: QuizType.SINGLE_SELECT,
  },
  {
    name: "Ko'p tanlovli",
    type: QuizType.MULTI_SELECT,
  },

  {
    name: 'Qisqa matn tanlovli',
    type: QuizType.SHORT_TEXT,
    disabled: true,
  },
  {
    name: "Ko'p matn tanlovli",
    type: QuizType.LONG_TEXT,
    disabled: true,
  },
  {
    name: 'Mos kelish tanlovli',
    type: QuizType.MATCH_PAIRS,
    disabled: true,
  },
  {
    name: 'Ketma-ket',
    type: QuizType.SEQUENCE,
    disabled: true,
  },
];

export const quizContentType = [
  {
    name: 'Matnli savol',
    type: QuizContentType.TEXT,
  },
  {
    name: 'Rasmli savol',
    type: QuizContentType.PHOTO,
  },
];

export const contentType = [
  {
    name: 'Text format',
    type: QuizContentType.TEXT,
  },
  {
    name: 'Rasm format',
    type: QuizContentType.PHOTO,
    disabled: true,
  },
  {
    name: 'Audio format',
    type: QuizContentType.AUDIO,
    disabled: true,
  },
];

export const puzzleDifficulties = [
  {
    name: 'Oson',
    type: PuzzleDifficulty.EASY,
  },
  {
    name: "O'rta",
    type: PuzzleDifficulty.MEDIUM,
  },
  {
    name: 'Qiyin',
    type: PuzzleDifficulty.HARD,
  },
];

