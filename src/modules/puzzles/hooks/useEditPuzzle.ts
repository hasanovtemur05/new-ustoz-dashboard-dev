import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { PuzzleInput } from '../types';
import { EditPuzzle } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditPuzzle = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: PuzzleInput) => EditPuzzle({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Boshqotirma muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['puzzles_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerPuzzleEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
