import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';
import { DeleteNews } from '../api';

export const useDeleteNews = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteNews(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['news_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerNewsDelete: mutate, isSuccess, isError };
};
