import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { CreateData } from '../api';
import { SuggestionDepartmentInputType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateSuggestionDepartment = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: SuggestionDepartmentInputType) => CreateData(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Bo\'lim muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['suggestion_departments_list'] });
      setSheetOpen(false);
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
