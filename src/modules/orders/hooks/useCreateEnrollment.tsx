import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { CreateEnrollmet } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateEnrollment = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ userId, courseId }: { userId: string; courseId: string }) => {
      return CreateEnrollmet(courseId, userId);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'muvaffaqiyatli tastiqlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });
  return {
    triggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};