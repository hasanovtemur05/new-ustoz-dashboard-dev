import { useToast } from "components/ui/use-toast";
import { StatusType } from "../types";
import { useMutation } from "@tanstack/react-query";
import { RatingStatus } from "../api";
import { queryClient } from "services/react-query";
import { showErrorToast } from "utils/showErrorToast";

export const useEditCourseCommentsStatus = () => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusType }) => 
      RatingStatus(id, status),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tasdiqlandi!',
        description: 'Status muvaffaqiyatli o\'zgartirildi.',
      });
      queryClient.invalidateQueries({ queryKey: ['course_comments'] });
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    updateStatus: mutate,
    isPending,
    isSuccess,
    isError,
  };
};