// schema.ts
import { z } from 'zod';

const fileSchema = z.union([
  z.string().min(1),
  z.instanceof(File),
]).refine((val) => val !== '', { message: 'Fayl talab qilinadi' });

export const schema = z.object({
  name: z.string().min(2, { message: 'Kitob nomi talab qilinadi' }),
  photo: fileSchema.refine((val) => !!val, { message: 'Rasm talab qilinadi' }),
  file: fileSchema.refine((val) => !!val, { message: 'File talab qilinadi' }),
  pagesCount: z.coerce
    .number({ invalid_type_error: "Raqam bo'lishi kerak" })
    .min(1, { message: "1 dan katta bo'lishi kerak" }),
  description: z.string().optional(),
});

export type UseFormSchemaType = z.infer<typeof schema>;