import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { CategoryInputType } from '../types';
import { EditData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditCategories = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CategoryInputType) => EditData({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Malumot muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['categories_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
