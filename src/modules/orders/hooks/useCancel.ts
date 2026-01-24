import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { CancelData } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useCancelOrder = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => CancelData(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyatli bekor qilindi!',
      });
      queryClient.invalidateQueries({ queryKey: ['order_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerCencelOrder: mutate, isSuccess, isError };
};
