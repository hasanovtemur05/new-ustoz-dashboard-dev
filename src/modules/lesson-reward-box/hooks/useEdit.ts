import { useMutation } from '@tanstack/react-query';
import { EditBox } from '../api';
import { queryClient } from 'services/react-query';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';
import { ILessonRewardBoxEdit } from '../types';

export const useEditBox = (courseId: string, boxId: string, onSuccess?: () => void) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: ILessonRewardBoxEdit) => EditBox(boxId, values),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Box updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['lesson_reward_boxes', courseId] });
      onSuccess?.();
    },
    onError: showErrorToast,
  });
};
