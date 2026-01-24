import { LessonRewardType } from 'modules/course-reward-product/types';
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
  description: z.string().optional(),
  value: z.union([z.number(), z.string()]).optional(),
  count: z.union([z.number(), z.string()]).optional(),
  type: z.nativeEnum(LessonRewardType, {
    errorMap: () => ({ message: "Sovg'a  type talab qilinadi" }),
  }),
  file: z.union([z.custom<File>((file) => file instanceof File), z.string()]).optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
