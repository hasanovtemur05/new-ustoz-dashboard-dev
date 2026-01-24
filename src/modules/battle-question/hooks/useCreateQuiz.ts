import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateQuiz } from '../api';
import { BattleQuizInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateBattleQuiz = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: BattleQuizInput) => CreateQuiz(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Exam test muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['battle_qestion_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerQuizCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
