import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { Delete } from '../api';

export const useDeleteReplay = () => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => {
      return Delete(id);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Javob muvaffaqiyatli o\'chirildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['course_comments'] });
      
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  return {
    triggerReplayDelete: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};