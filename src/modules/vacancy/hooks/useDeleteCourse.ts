import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteVacancy } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteVacancy = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteVacancy(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['vacancies_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerVacancyDelete: mutate, isSuccess, isError };
};
