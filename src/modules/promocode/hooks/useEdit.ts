import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { IPromocodeInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { EditPromocode } from '../api';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditPromocode = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: IPromocodeInput) => EditPromocode({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Kurs muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['promocodes_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerVacancyEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
