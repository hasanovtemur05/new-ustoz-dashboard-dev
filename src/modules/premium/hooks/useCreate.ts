import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateData } from '../api';
import { PremiumInputType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreatePremium = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: PremiumInputType) => {
     
      return CreateData(values)
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Premium haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['premium_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error)
    },
  });
  return {
    triggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
