import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { DeleteBook } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBook = (id: string) => {
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => DeleteBook(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['books_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerBookDelete: mutate, isPending };
};