import { z } from "zod";

export const schema = z.object({
  title: z.string().min(2, { message: "Banner  nomi talab qilinadi" }),
  content: z.string().optional(),
  objectId: z.string().optional(),
  photo: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: "Rasm talab qilinadi",
    }),
    z.string().min(2, { message: "Banner  type talab qilinadi" }),
  ]),

  type: z.string().min(2, { message: "Banner  type talab qilinadi" }),
  location: z.string().min(2, {
    message: "Yaroqli location type bo'lishi kerak",
  }),
  link: z.string().optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
