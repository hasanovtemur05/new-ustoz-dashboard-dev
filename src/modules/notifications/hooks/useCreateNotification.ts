import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateNotification } from '../api';
import { NotificationInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateNotification = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: NotificationInput) => CreateNotification(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Bildirishnoma muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['notifications_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerNotificationCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
