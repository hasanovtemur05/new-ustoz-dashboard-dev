import { useMutation } from "@tanstack/react-query";

import { useToast } from "components/ui/use-toast";
import { CreatePromocode } from "../api";
import { IPromocodeInput } from "../types";
import { queryClient } from "services/react-query";
import { showErrorToast } from "utils/showErrorToast";

interface IHook {
  setSheetOpen: (state: boolean) => void;
}

export const useCreatePromocode = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: IPromocodeInput) => CreatePromocode(values),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Muvaffaqiyat!",
        description: "Vakansiya muvaffaqiyatli yaratildi.",
      });
      queryClient.invalidateQueries({ queryKey: ["promocodes_list"] });
      setSheetOpen(false);
    },
    onError: (error: any) => showErrorToast(error),
  });

  return {
    triggerVacancyCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
