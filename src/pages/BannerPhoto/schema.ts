import * as z from 'zod';

export const schema = z.object({
  title: z.string().min(1, 'Sarlavha kiritilishi shart'),
  whereIs: z.string().min(1, 'Joylashuv kiritilishi shart'),
  photo: z.any().refine((val) => val instanceof File || typeof val === 'string', 'Rasm yuklanishi shart'),
});

export type useFormSchemaType = z.infer<typeof schema>;
