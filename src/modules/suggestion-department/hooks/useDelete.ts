import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { DeleteData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteSuggestionDepartment = () => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => DeleteData(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Bo\'lim muvaffaqiyatli o\'chirildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['suggestion_departments_list'] });
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });
  return {
    triggerDelete: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
