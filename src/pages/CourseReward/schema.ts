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
  description: z.string().min(1, { message: 'Tarif talab qilinadi' }),
  value: z.union([z.number(), z.string()]).optional(),
  count: z.union([z.number(), z.string()]).optional(),
  type: z.nativeEnum(LessonRewardType, {
    errorMap: () => ({ message: "Sovg'a  type talab qilinadi" }),
  }),
  file: z.union([z.custom<File>((file) => file instanceof File), z.string()]).optional(),
  isPartial: z.boolean().optional(),
  courseId: z.string().optional(),
  parts: z.array(
    z.object({
      title: z.string().min(1, { message: 'Nomi talab qilinadi' }),
      photo: fileType,
      value: z.union([z.number(), z.string()]).optional(),
    })
  ).optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
