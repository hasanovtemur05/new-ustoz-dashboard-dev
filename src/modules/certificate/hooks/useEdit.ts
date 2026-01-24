import { useMutation } from '@tanstack/react-query';
import { useToast } from 'components/ui/use-toast';

import { CertificateInputType, CreateRecommendationCertificateType } from '../types';
import { EditData, RecomEditData } from '../api';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  id: string ;
  type: 'certificate' | 'recommendation';
  setSheetOpen: (state: boolean) => void;
}


// ****************************************  EDIT CERTIFICATE  **********************************************

export const useEditRow = ({ id, type, setSheetOpen }: IHook) => {
  const { toast } = useToast();
  

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CertificateInputType | CreateRecommendationCertificateType) =>
      type === 'certificate'
        ? EditData({ values: values as CertificateInputType, id })
        : RecomEditData({ values: values as CreateRecommendationCertificateType, id }),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Ma’lumot muvaffaqiyatli tahrirlandi.',
      });
      queryClient.invalidateQueries({ queryKey: [type === 'certificate' ? 'certificates_list' : 'recommendation_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return { triggerEdit: mutate, isPending, isSuccess, isError };
};

