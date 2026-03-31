import { useMutation } from '@tanstack/react-query';
import { DeleteBoxItem } from '../api';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBoxItem = (courseId: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: DeleteBoxItem,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Item removed successfully' });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_boxes', courseId] });
    },
    onError: showErrorToast,
  });
};
