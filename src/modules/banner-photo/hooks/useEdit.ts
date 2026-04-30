import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';
import { UpdateBannerPhoto } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IProps {
  id: string;
  setSheetOpen: (state: boolean) => void;
}

export const useEditBannerPhoto = ({ id, setSheetOpen }: IProps) => {
  const { toast } = useToast();

  const { mutate: triggerEdit, isPending } = useMutation({
    mutationFn: (payload: any) => UpdateBannerPhoto(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner_photos_list'] });
      setSheetOpen(false);
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: "Banner rasm tahrirlandi",
      });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerEdit, isPending };
};
