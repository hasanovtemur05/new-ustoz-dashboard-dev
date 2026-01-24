import { Puzzle, PuzzleDifficulty } from './types';
export const getPuzzle = (item?: Puzzle) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    board_state: item?.board_state ?? '',
    correct_moves: item?.correct_moves?.length ? item.correct_moves : [],
    puzzle_type: item?.puzzle_type ?? PuzzleDifficulty.EASY,
  };
};

export const getPuzzlesList = (data?: Puzzle[]) => {
  return data?.length
    ? data.map(item => {
        return getPuzzle(item);
      })
    : [];
};
