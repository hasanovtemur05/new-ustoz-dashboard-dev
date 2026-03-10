import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateGames } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { WebGamesInput } from '../types';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateGames = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: WebGamesInput) => CreateGames(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'O\'yin muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['web-games_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerGamesCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
