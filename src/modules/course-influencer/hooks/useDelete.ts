import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { DeleteInfluencer } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteInfluencer = (id: string) => {
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => DeleteInfluencer(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['influencer_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerInfoDelete: mutate, isPending };
};