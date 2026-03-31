import { useMutation } from '@tanstack/react-query';
import { CreateBox } from '../api';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useCreateBox = (courseId: string, onSuccess?: () => void) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: CreateBox,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Box created successfully' });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_boxes', courseId] });
      onSuccess?.();
    },
    onError: showErrorToast,
  });
};
