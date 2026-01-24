import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteData } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBottomSheet = (p0: string) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => {
      console.log('Deleting ID:', id);
      return DeleteData(id);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['bottomsheet_list'] });
    },
    onError: (error: any) => {
      console.error('Delete error:', error);
      showErrorToast(error);
    },
  });

  return { 
    triggerInfoDelete: mutate, 
    isPending,
    isSuccess, 
    isError 
  };
};