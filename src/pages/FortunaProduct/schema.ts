import { FortunaProductType } from 'modules/fortuna-product/types';
import { z } from 'zod';

export const fileType = z
  .union([
    z.custom<File>((file) => file instanceof File, {
      message: 'Rasm talab qilinadi',
    }),
    z.string(),
  ])
  .optional();

export const schema = z.object({
  title: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
  photo: fileType,
  content: z.string().optional(),
  probability: z.union([z.number().max(10), z.string()]),
  value: z.union([z.number(), z.string()]).optional(),
  count: z.union([z.number(), z.string()]).optional(),
  isActive: z.boolean().optional(),
  type: z.nativeEnum(FortunaProductType, {
    errorMap: () => ({ message: "Sovg'a  type talab qilinadi" }),
  }),
});

export type useFormSchemaType = z.infer<typeof schema>;
