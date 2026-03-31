import { z } from 'zod';

export const fileType = z
  .union([
    z.custom<File>((file) => file instanceof File, {
      message: 'Rasm majburiy',
    }),
    z.string(),
  ]);

export const boxSchema = z.object({
  lessonId: z.string().min(1, 'Darsni tanlash majburiy'),
  courseId: z.string().min(1, 'Kursni tanlash majburiy'),
  title: z.string().min(1, 'Sarlavha majburiy').max(128, 'Maksimal 128 belgi'),
  image: fileType,
  description: z.string().optional(),
});

export const itemSchema = z.object({
  rewardId: z.string().min(1, 'Mukofotni tanlash majburiy'),
  partId: z.string().optional(),
});

export type BoxFormValues = z.infer<typeof boxSchema>;
export type ItemFormValues = z.infer<typeof itemSchema>;
