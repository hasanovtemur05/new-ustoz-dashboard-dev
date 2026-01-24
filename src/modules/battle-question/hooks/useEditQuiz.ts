import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { BattleQuizInput } from '../types';
import { EditQuiz } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditBattleQuiz = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: BattleQuizInput) => EditQuiz({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Exam test muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['battle_qestion_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerQuizEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
