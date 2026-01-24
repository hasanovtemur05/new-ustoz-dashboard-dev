import { z } from 'zod';


export const schema = z.object({
  title: z.string().min(3, { message: 'Banner nomi talab qilinadi' }),
  isActive: z.boolean().optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
