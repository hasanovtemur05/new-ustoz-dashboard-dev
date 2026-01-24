import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateData } from '../api';
import { ProductInputType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateProduct = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: ProductInputType) => {
     
      return CreateData(values)
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Product haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['products_list'] });
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
