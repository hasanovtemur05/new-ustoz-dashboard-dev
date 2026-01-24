import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteModule } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteModule = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteModule(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['modules_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerModuleDelete: mutate, isSuccess, isError };
};
