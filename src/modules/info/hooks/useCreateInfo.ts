import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateInfo } from '../api';
import { InfoInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateInfo = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: InfoInput) => {
      // delete values.course
      if (values.course === "all") {
        return CreateInfo({ ...values, course: null })
      }
      return CreateInfo(values)
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kurs haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['info_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error)
    },
  });
  return {
    triggerInfoCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
