import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateData } from '../api';
import { LessonRewardInputType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';


export const useCreateLessonReward = () => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: LessonRewardInputType) => {
      return CreateData(values);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Product haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_list'] });
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });
  return {
    triggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
