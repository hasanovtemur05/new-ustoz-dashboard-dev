import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteData } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteOrder = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteData(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['order_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerOrderDelete: mutate, isSuccess, isError };
};
