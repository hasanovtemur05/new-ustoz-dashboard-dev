import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteLesson } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteLesson = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteLesson(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['lessons_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerLessonDelete: mutate, isSuccess, isError };
};
