import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { CreateNews } from '../api';
import { NewsInput } from '../types';

export const useCreateNews = (setSheetOpen:(state: boolean) => void) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: (values: NewsInput) => CreateNews(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Yangilik muvaffaqiyatli yaratildi.',
      });
      setSheetOpen(false)
      queryClient.invalidateQueries({ queryKey: ['news_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerNewsCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
    data,
  };
};
