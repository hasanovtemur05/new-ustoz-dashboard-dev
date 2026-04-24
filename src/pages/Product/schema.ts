import { z } from "zod"

export const fileType = z
  .union([
    z.custom<File>((file) => file instanceof File, {
      message: "Rasm talab qilinadi",
    }),
    z.string(),
  ])
  .optional()

export const workingHourSchema = z.object({
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]),
  open: z.string().min(5),
  close: z.string().min(5),
})

// Base schema
export const baseSchema = z.object({
  title: z.string().min(3, { message: "Malumot nomi talab qilinadi" }),
  photo: fileType,
  content: z.string().min(3, { message: "Kontent talab qilinadi" }),
  price: z.union([z.number(), z.string().transform((v) => Number(v))]),
  cashPrice: z.union([z.number(), z.string().transform((v) => Number(v))]).optional(),
  count: z.union([z.number(), z.string().transform((v) => Number(v))]),
  isActive: z.boolean().optional(),
  isActiveOnGift: z.boolean().optional(),
  categoryId: z.string().uuid({ message: "Kategoriya tanlash shart" }),
  workingHours: z.array(workingHourSchema).optional(),
  type: z.enum(['PHYSICAL', 'AI_ASSISTANT']).default('PHYSICAL'),
  openAiAssistantId: z.string().optional(),
})

// Dynamic schema yaratish uchun sodda yechim
export const createSchemaWithPhotos = (photoCount: number) => {
  const photoFields: Record<string, typeof fileType> = {}

  for (let i = 1; i <= photoCount; i++) {
    photoFields[`photo${i}`] = fileType
  }

  return baseSchema.extend(photoFields)
}

export type useFormSchemaType = z.infer<ReturnType<typeof createSchemaWithPhotos>>
