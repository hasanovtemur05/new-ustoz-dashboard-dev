import { z } from 'zod';


export const schema = z.object({
  title: z.string().min(3, { message: 'Hikoya nomi talab qilinadi' }),
  button: z.string().min(3, { message: 'Hikoya tugmasining texti talab qilinadi' }),
  type: z.string().min(3, { message: 'Hikoya turi talab qilinadi' }),
  content: z.string().optional(),
  objectId: z.string().optional(),
  link: z.string().optional(),
  photo: z
    .union([
      z.custom<File>(file => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string(),
    ])
    .optional(),
  deadline: z.string({ message: "Hikoya tugash vaqtini kiriting" }),
  video: z
    .union([
      z.custom<File>(file => file instanceof File, {
        message: 'Video talab qilinadi',
      }),
      z.string(),
    ])
    .optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
