import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { LessonInput } from '../types';
import { EditLesson } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditLesson = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: LessonInput) => EditLesson({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Dars muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['lessons_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerLessonEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
