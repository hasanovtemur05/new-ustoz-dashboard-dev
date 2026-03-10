import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteGames } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteGames = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteGames(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['web-games_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerDeleteGames: mutate, isSuccess, isError };
};
