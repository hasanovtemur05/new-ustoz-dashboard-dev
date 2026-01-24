import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { CourseInput } from '../types';
import { EditCourse } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditCourse = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CourseInput) => EditCourse({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Kurs muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['courses_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerCourseEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
