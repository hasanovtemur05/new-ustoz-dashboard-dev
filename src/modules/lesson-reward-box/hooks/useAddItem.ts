import { useMutation } from '@tanstack/react-query';
import { AddItemToBox } from '../api';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';
import { ILessonRewardBoxItemInput } from '../types';

export const useAddItemToBox = (courseId: string, boxId: string, onSuccess?: () => void) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: ILessonRewardBoxItemInput) => AddItemToBox(boxId, values),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Item added successfully' });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_boxes', courseId] });
      onSuccess?.();
    },
    onError: showErrorToast,
  });
};
