import { z } from 'zod';

export const schema = z.object({
  courseId: z.string().min(1, { message: 'Kurs tanlanishi shart' }),
  lessonId: z.string().min(1, { message: 'Dars tanlanishi shart' }),
  rewardId: z.string().min(1, { message: 'Sovg\'a tanlanishi shart' }),
});

export type useFormSchemaType = z.infer<typeof schema>;
