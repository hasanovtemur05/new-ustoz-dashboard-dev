import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { ModuleEditInput } from '../types';
import { EditModule } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditModule = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: ModuleEditInput) => EditModule({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: "Bo'lim muvaffaqiyatli tahrirlandi.",
      });
      queryClient.invalidateQueries({ queryKey: ['modules_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerModuleEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
