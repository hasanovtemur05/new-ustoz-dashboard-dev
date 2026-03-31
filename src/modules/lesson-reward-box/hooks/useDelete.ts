import { useMutation } from '@tanstack/react-query';
import { DeleteBox } from '../api';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBox = (courseId: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: DeleteBox,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Box deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_boxes', courseId] });
    },
    onError: showErrorToast,
  });
};
