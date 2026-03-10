import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { ReplayCommits } from '../api';

interface IHook {
  setReplayOpen: (state: boolean) => void;
}

interface ReplayParams {
  ratingId: string;
  content: string;
}

export const useCreateReplay = ({ setReplayOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ ratingId, content }: ReplayParams) => {
      return ReplayCommits(ratingId, content);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Javob muvaffaqiyatli yuborildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['course_comments'] });
      setReplayOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  return {
    triggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};