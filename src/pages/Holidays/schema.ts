import { z } from "zod";

export const schema = z.object({
  photo: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: "Rasm talab qilinadi",
    }),
    z.string().optional(),
  ]).optional(),
  day: z.number().min(1).max(31, { message: "Kun 1 dan 31 gacha bo'lishi kerak" }),
  month: z.number().min(1).max(12, { message: "Oy 1 dan 12 gacha bo'lishi kerak" }),
  region: z.string().optional(),
  translations: z.array(
    z.object({
      id: z.string().optional(),
      language: z.string().min(2, { message: "Til talab qilinadi" }),
      name: z.string().min(2, { message: "Nomi talab qilinadi" }),
    })
  ).min(1, { message: "Kamida bitta tarjima talab qilinadi" }),
});

export type useFormSchemaType = z.infer<typeof schema>;
