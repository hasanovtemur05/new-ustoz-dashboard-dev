import { z } from 'zod';

export const schema = z.object({
    userId: z.string().min(3, { message: 'Foydalanuvchi idisi talab qilinadi' }),
    courseId: z.string().min(3, { message: 'Kurs idisi talab qilinadi' }),
});

export type useFormSchemaType = z.infer<typeof schema>;
