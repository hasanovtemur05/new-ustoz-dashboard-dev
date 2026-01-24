import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { GenerateData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useAutoGeneratePromocode = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (count: number) => {
      return GenerateData(count);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['reward_promocode_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });
  return {
    generatePromocode: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
