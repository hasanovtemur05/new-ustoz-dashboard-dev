import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { EditNews } from '../api';
import { NewsInput } from '../types';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditNews = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: NewsInput) => EditNews({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Yangilik muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['news_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerNewsEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
