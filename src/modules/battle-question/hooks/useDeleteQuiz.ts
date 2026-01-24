import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteQuiz } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBattleQuiz = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteQuiz(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['battle_qestion_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerQuizDelete: mutate, isSuccess, isError };
};
