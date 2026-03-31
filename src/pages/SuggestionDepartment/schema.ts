import { z } from "zod"

export const suggestionDepartmentSchema = z.object({
  title: z.string().min(2, { message: "Bo'lim nomi kamida 2 ta belgidan iborat bo'lishi kerak" }),
  icon: z.string().min(1, { message: "Ikonka tanlash majburiy" }),
  userId: z.string().uuid({ message: "Mas'ul adminni tanlash majburiy" }),
  order: z.union([z.number(), z.string().transform((v) => Number(v))]).optional(),
  isActive: z.boolean().optional(),
})

export type SuggestionDepartmentSchemaType = z.infer<typeof suggestionDepartmentSchema>
