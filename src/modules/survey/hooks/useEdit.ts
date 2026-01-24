import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { EditData } from '../api';
import { ISurveyInput } from '../types';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditSurvey = ({ id, setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: ISurveyInput) => EditData({ values, id: id! }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'So\'rovnoma muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['survey_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  return {
    triggerEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
