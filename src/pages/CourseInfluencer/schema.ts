// modules/course-influencer/schema.ts
import { z } from 'zod';

export const schema = z.object({
  userId: z.string().min(1, { message: 'Foydalanuvchi talab qilinadi' }),
  courseId: z.string().min(1, { message: 'Kurs talab qilinadi' }),
});

export type UseFormSchemaType = z.infer<typeof schema>;