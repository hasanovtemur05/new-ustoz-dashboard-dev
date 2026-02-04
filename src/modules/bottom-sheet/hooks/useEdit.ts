import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { EditData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditBottomSheet = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (payload: any) => {
      return EditData({ payload, id });
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Malumot muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['bottomsheet_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerEdit: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};