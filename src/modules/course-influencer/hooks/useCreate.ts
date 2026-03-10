import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';
import { InfluencerInput } from '../types';
import { CreateInfluencer } from '../api';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateInfluencer = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: InfluencerInput) => CreateInfluencer(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kurs Influencer muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['influencer_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerInfluencerCreate: mutateAsync, isPending };
};