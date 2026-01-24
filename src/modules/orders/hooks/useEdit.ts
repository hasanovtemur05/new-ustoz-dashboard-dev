import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { IOrderInput } from '../types';
import { EditData } from '../api';

export const useEditOrder = () => {
  const { toast } = useToast();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: IOrderInput) => EditData(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Malumot muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['order_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
  };
};
