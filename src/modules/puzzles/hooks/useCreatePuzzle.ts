import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreatePuzzle } from '../api';
import { PuzzleInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreatePuzzle = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: PuzzleInput) => CreatePuzzle(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Boshqotirma muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['puzzles_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerPuzzleCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
