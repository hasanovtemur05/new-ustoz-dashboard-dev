import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Puzzle, PuzzleDifficulty } from 'modules/puzzles/types';

import { Form } from 'components/ui/form';
import { useCreatePuzzle } from 'modules/puzzles/hooks/useCreatePuzzle';
import { useEditPuzzle } from 'modules/puzzles/hooks/useEditPuzzle';
import { SelectField, TextAreaField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import PuzzleCorrectMoves from './PuzzleCorrectMoves';
import { puzzleDifficulties } from 'constants/index';
import ChessboardComponent from 'components/Chessboard';

const puzzleSchema = z.object({
  title: z.string().min(3),
  board_state: z.string().min(3),
  correct_moves: z.array(z.string()),
  puzzle_type: z.nativeEnum(PuzzleDifficulty),
});

type puzzleFormSchema = z.infer<typeof puzzleSchema>;

interface IProps {
  puzzle?: Puzzle;
  setSheetOpen: (state: boolean) => void;
}

export default function PuzzleForm({ puzzle, setSheetOpen }: IProps) {
  const { triggerPuzzleCreate, isPending: isPuzzleCreatePending } =
    useCreatePuzzle({ setSheetOpen });
  const { triggerPuzzleEdit, isPending: isPuzzleEditPending } = useEditPuzzle({
    id: puzzle?.id,
    setSheetOpen,
  });

  const form = useForm<puzzleFormSchema>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: puzzle
      ? {
          title: puzzle.title,
          board_state: puzzle.board_state,
          correct_moves: puzzle.correct_moves,
          puzzle_type: puzzle.puzzle_type,
        }
      : {
          title: '',
          board_state: '',
          correct_moves: [''],
          puzzle_type: PuzzleDifficulty.EASY,
        },
  });

  async function onSubmit(formValues: puzzleFormSchema) {
    if (puzzle) {
      triggerPuzzleEdit(formValues);
    } else {
      triggerPuzzleCreate(formValues);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Boshqotirma nomi" required />
          <SelectField
            name="puzzle_type"
            data={puzzleDifficulties}
            label="Darajasi"
          />
          <TextAreaField
            name="board_state"
            label="Boshqotirmaning dastlabki holati"
            required
          />
          <ChessboardComponent pgn={form.getValues('board_state')} />
          <PuzzleCorrectMoves />
        </div>
        {puzzle ? (
          <LoadingButton isLoading={isPuzzleEditPending}>
            Tahrirlash
          </LoadingButton>
        ) : (
          <LoadingButton isLoading={isPuzzleCreatePending}>
            Saqlash
          </LoadingButton>
        )}
      </form>
    </Form>
  );
}
