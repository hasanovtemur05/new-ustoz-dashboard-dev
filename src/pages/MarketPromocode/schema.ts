import { z } from 'zod';

export const schema = z.object({
  productId: z.string({ message: 'Mahsulotni tanlang' }),
  file: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: 'File talab qilinadi',
    }),
    z.string().min(2, { message: 'File talab qilinadi' }),
  ]),
});

export type useFormSchemaType = z.infer<typeof schema>;

export const generateSchema = z.object({
  number: z.number().min(1),
  discountType: z.string().min(1, 'Chegirma turini kiriting'),
  discountValue: z.number().min(0),
});

export type useGenerateSchemaType = z.infer<typeof generateSchema>;

export const checkFileSchema = z.object({
  file: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: 'File talab qilinadi',
    }),
    z.string().min(2, { message: 'File talab qilinadi' }),
  ]),
});

export type useCheckFileSchemaType = z.infer<typeof checkFileSchema>;
