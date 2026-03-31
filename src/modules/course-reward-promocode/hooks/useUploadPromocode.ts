import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { UploadPromocodeFile } from '../api';
import { showErrorToast } from 'utils/showErrorToast';

export const useUploadPromocode = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rewardId, file }: { rewardId: string; file: File }) => {
      return UploadPromocodeFile(rewardId, file);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyatli!',
        description: 'Promokodlar fayli yuklandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['reward_promocode_list'] });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_list'] });
      onSuccess?.();
    },
    onError: showErrorToast,
  });
};
