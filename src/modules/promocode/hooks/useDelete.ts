import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeletePromocode } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeletePromocode = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeletePromocode(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['promocodes_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerVacancyDelete: mutate, isSuccess, isError };
};
