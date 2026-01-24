import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteNotification } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteNotification = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteNotification(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['notifications_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerNotificationDelete: mutate, isSuccess, isError };
};
