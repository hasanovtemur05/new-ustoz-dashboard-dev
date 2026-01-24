import { z } from 'zod';

export const schema = z.object({
  courseId: z.string().min(3, { message: 'Kurs idisi talab qilinadi' }),
  assistantId: z.string().min(3, { message: 'Assistant idisi talab qilinadi' }),
  staticAnimation: z
    .union([
      z.custom<File>((file) => file instanceof File, {
        message: 'AI ni oddiy holatdagi  rasmi talab qilinadi',
      }),
      z.string(),
    ]),
  thinkingAnimation: z
    .union([
      z.custom<File>((file) => file instanceof File, {
        message: "O'ylangan holatdagi animation talab qilinadi",
      }),
      z.string(),
    ]),
});

export type useFormSchemaType = z.infer<typeof schema>;
