import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { DeleteData } from '../api';
import { useToast } from 'components/ui/use-toast';
import { showErrorToast } from 'utils/showErrorToast';

export type RowType = 'certificate' | 'recommendation';

export const useDeleteRow = (id: string, type?: RowType) => {
  const { toast } = useToast()

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => DeleteData(id, type),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Muvaffaqiyatli o'chirildi!",
      })
      queryClient.invalidateQueries({ queryKey: ["certificates_list"] })
      queryClient.invalidateQueries({ queryKey: ["recommendation_list"] })
    },
    onError: (error: any) => showErrorToast(error),
  })

  return { triggerDelete: mutate, isSuccess, isError }
}
