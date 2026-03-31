import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { LessonRewardInputType } from '../types';
import { EditData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';


export const useEditLessonReward = ({ id = '' }: { id?: string }) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: LessonRewardInputType) => EditData({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Malumot muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerEdit: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
