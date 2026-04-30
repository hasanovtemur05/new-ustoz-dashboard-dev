import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { CreateBannerPhoto } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IProps {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateBannerPhoto = ({ setSheetOpen }: IProps) => {
  const { toast } = useToast();

  const { mutate: triggerCreate, isPending } = useMutation({
    mutationFn: CreateBannerPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner_photos_list'] });
      setSheetOpen(false);
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: "Banner rasm muvaffaqiyatli qo'shildi",
      });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerCreate, isPending };
};
