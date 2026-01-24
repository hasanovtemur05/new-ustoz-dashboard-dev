import { z } from 'zod';


export const schema = z.object({
  fullname: z.string().min(3, { message: 'Hikoya nomi talab qilinadi' }),
  photo: z
    .union([
      z.custom<File>(file => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string(),
    ])
    .optional(),
 
});

export type useFormSchemaType = z.infer<typeof schema>;
