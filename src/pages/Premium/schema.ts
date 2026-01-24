import { z } from 'zod';

const type =z.string()
export const schema = z.object({
  plan: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
  user: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
});

export type useFormSchemaType = z.infer<typeof schema>;
