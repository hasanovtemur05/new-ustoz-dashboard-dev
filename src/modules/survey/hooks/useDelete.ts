import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { DeleteData } from '../api';

export const useDeleteSurvey = (id?: string) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteData(id!),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'So\'rovnoma muvaffaqiyatli o\'chirildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['survey_list'] });
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  return {
    triggerInfoDelete: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
