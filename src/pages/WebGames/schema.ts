import { z } from "zod"

/**
 * File yoki string (edit holati uchun)
 */
export const fileType = z
  .union([
    z.custom<File>((file) => file instanceof File, {
      message: "Rasm yuklash majburiy",
    }),
    z.string(),
  ])
  .optional()

/**
 * Base WebGames schema
 */
export const baseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O'yin nomi kamida 3 ta belgidan iborat bo'lishi kerak" }),

  logo: fileType,

  description: z
    .string()
    .min(3, { message: "O'yin tavsifi kamida 3 ta belgidan iborat bo'lishi kerak" }),

  link: z
    .string()
    .min(5, { message: "Link kiritish majburiy" })
    .url({ message: "To'g'ri URL kiriting" }),

  isActive: z.boolean().optional(),
})

/**
 * Dynamic photo field lar uchun schema
 */
export const createSchemaWithPhotos = (photoCount: number) => {
  const photoFields: Record<string, typeof fileType> = {}

  for (let i = 1; i <= photoCount; i++) {
    photoFields[`photo${i}`] = fileType
  }

  return baseSchema.extend(photoFields)
}

/**
 * Form type
 */
export type WebGamesFormType = z.infer<
  ReturnType<typeof createSchemaWithPhotos>
>