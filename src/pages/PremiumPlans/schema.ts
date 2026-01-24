import { z } from 'zod';

const type =z.string()
export const schema = z.object({
  title: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
  property1: type,
  property2: type.optional(),
  property3: type.optional(),
  property4: type.optional(),
  property5: type.optional(),
  price: z.union([z.number(), z.string()]),
  durationInDays: z.union([z.number(), z.string()]),
  isVisible: z.boolean().optional(),
});

export type useFormSchemaType = z.infer<typeof schema>;
