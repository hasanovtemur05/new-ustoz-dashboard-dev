"use client"

import { useMutation } from "@tanstack/react-query"

import { useToast } from "components/ui/use-toast"
import type { CourseInput } from "../types"
import { queryClient } from "services/react-query"
import { showErrorToast } from "utils/showErrorToast"
import { CreateCourse } from "../api"

interface IHook {
  setSheetOpen: (state: boolean) => void
}

export const useCreateCourse = ({ setSheetOpen }: IHook) => {
  const { toast } = useToast()

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CourseInput) => CreateCourse(values),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Muvaffaqiyat!",
        description: "Kurs muvaffaqiyatli yaratildi.",
      })
      queryClient.invalidateQueries({ queryKey: ["courses_list"] })
      setSheetOpen(false)
    },
    onError: (error: any) => showErrorToast(error),
  })

  return {
    triggerCourseCreate: mutate,
    isPending,
    isSuccess,
    isError,
  }
}

