import { useMutation } from '@tanstack/react-query';

import { useToast } from 'components/ui/use-toast';
import { CreateData, CreateRecommendationData } from '../api';
import { CertificateInputType, CreateRecommendationCertificateType } from '../types';
import { queryClient } from 'services/react-query';
import { showErrorToast } from 'utils/showErrorToast';

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreateCertificate = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CertificateInputType) => {
      // delete values.course
      // if (values.course === "all") {
      //   return CreateData({ ...values })
      // }
      return CreateData(values)
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kurs haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['certificates_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error)
    },
  });
  return {
    triggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};

export const useCreateRecommendationCertificate = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CreateRecommendationCertificateType) => {
      return CreateRecommendationData(values)
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Kurs haqida malumot muvaffaqiyatli yaratildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['RecCertificates_list'] });
      setSheetOpen(false);
    },
    onError: (error: any) => {
      showErrorToast(error)
    },
  });
  return {
    recTriggerCreate: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
