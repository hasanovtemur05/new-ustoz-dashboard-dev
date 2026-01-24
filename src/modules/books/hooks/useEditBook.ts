import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { BookInput } from '../types';
import { EditBook } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditBook = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: BookInput) => EditBook({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kitob muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['books_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerBookEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
