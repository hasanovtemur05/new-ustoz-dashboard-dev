export enum PuzzleDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Puzzle {
  id: string;
  title: string;
  board_state: string;
  correct_moves: string[];
  puzzle_type: PuzzleDifficulty;
}

export interface PuzzleInput {
  title: string;
  board_state: string;
  correct_moves: string[];
  puzzle_type: PuzzleDifficulty;
}

export interface PuzzleEditBody {
  id: string;
  values: PuzzleInput;
}
