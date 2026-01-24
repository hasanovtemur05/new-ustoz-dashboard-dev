import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteCourse } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteCourse = (id: string) => {
  const { toast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteCourse(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "Muvaffaqiyatli o'chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ['courses_list'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerCourseDelete: mutate, isSuccess, isError };
};
