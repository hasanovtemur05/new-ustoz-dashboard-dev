import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { CreateBook } from '../api';
import { BookInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateBook = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: BookInput) => CreateBook(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kitob muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['books_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerBookCreate: mutateAsync, isPending };
};