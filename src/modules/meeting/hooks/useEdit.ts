import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { IMeetingInput } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { EditMeeting } from '../api';

interface IHook {
  id?: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditMeeting = ({ id = '', setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: IMeetingInput) => EditMeeting({ values, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'Muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: ['meetings_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerMeetingEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
