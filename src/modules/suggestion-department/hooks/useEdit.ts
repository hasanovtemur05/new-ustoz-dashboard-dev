import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { EditData } from '../api';
import { SuggestionDepartmentEditBodyType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useEditSuggestionDepartment = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: SuggestionDepartmentEditBodyType) => EditData(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Bo\'lim muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['suggestion_departments_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });
  return {
    triggerEdit: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
