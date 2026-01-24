import { z } from 'zod';
import { SurveyContext } from 'modules/survey/constants';

export const schema = z
  .object({
    title: z.string().min(3, { message: 'Title talab qilinadi' }),
    question: z.string().min(3, { message: 'Savol talab qilinadi' }),
    context: z.nativeEnum(SurveyContext, {
      errorMap: () => ({ message: 'Kontekst tanlanishi shart' }),
    }),
    points: z.union([z.number(), z.string()]).optional(),
    options: z.array(z.object({ value: z.string() })).default([]),
    courseId: z.string().optional(),
    lessonId: z.string().optional(),
  })
  .refine(
    (data) => {
      // If context is COURSE, courseId should be provided
      if (data.context === SurveyContext.COURSE) {
        return !!data.courseId;
      }
      return true;
    },
    {
      message: 'Kurs konteksti uchun kurs tanlanishi shart',
      path: ['courseId'],
    }
  );

export type useFormSchemaType = z.infer<typeof schema>;
