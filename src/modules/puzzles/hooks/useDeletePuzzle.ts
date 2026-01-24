import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeletePuzzle } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeletePuzzle = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeletePuzzle(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['puzzles_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerPuzzleDelete: mutate, isSuccess, isError };
};
