import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteMeeting } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteMeeting = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteMeeting(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['meetings_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerMeeetingDelete: mutate, isSuccess, isError };
};
