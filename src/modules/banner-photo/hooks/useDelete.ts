import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { DeleteBannerPhoto } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

export const useDeleteBannerPhoto = (id: string) => {
  const { toast } = useToast();

  const { mutate: triggerDelete, isPending } = useMutation({
    mutationFn: () => DeleteBannerPhoto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner_photos_list'] });
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: "Banner rasm o'chirildi",
      });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerDelete, isPending };
};
