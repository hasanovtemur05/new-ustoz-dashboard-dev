import { z } from 'zod';
import { TaskEvent, TaskFrequency, TaskType } from 'modules/market-taskts/constants';

export const fileType = z
  .union([
    z.custom<File>((file) => file instanceof File, {
      message: 'Rasm talab qilinadi',
    }),
    z.string(),
  ])
  .optional();

export const schema = z
  .object({
    title: z.string().min(3, { message: 'Topshiriq nomi talab qilinadi' }),
    photo: fileType,
    description: z.string().min(1, { message: 'Tavsif talab qilinadi' }),
    points: z.union([z.number(), z.string()]).refine((val) => Number(val) > 0, {
      message: 'Ball musbat son bo\'lishi kerak',
    }),
    frequency: z.nativeEnum(TaskFrequency, {
      errorMap: () => ({ message: 'Chastota tanlanishi shart' }),
    }),
    event: z.nativeEnum(TaskEvent, {
      errorMap: () => ({ message: 'Hodisa tanlanishi shart' }),
    }),
    type: z.nativeEnum(TaskType, {
      errorMap: () => ({ message: 'Turi tanlanishi shart' }),
    }),
    surveyId: z.string().optional(),
    completedCourseCount: z.union([z.number(), z.string()]).optional(),
    isActive: z.boolean().optional().default(true),
    startsAt: z.date().optional(),
    endsAt: z.date().optional(),
  })
  .refine(
    (data) => {
      // If type is SURVEY, surveyId is required
      if (data.type === TaskType.SURVEY) {
        return !!data.surveyId;
      }
      return true;
    },
    {
      message: 'So\'rovnoma turi uchun so\'rovnoma tanlanishi shart',
      path: ['surveyId'],
    }
  )
  .refine(
    (data) => {
      // If both dates are provided, endsAt should be after startsAt
      if (data.startsAt && data.endsAt) {
        return data.endsAt > data.startsAt;
      }
      return true;
    },
    {
      message: 'Tugash sanasi boshlanish sanasidan keyinroq bo\'lishi kerak',
      path: ['endsAt'],
    }
  )
  .refine(
    (data) => {
      // If event is COMPLETE_COURSE, completedCourseCount is required
      if (data.event === TaskEvent.COMPLETE_COURSE) {
        return !!data.completedCourseCount && Number(data.completedCourseCount) > 0;
      }
      return true;
    },
    {
      message: 'Kursni yakunlash hodisasi uchun yakunlangan kurslar soni talab qilinadi',
      path: ['completedCourseCount'],
    }
  )
  .refine(
    (data) => {
      // If frequency is SPECIAL, both dates are required
      if (data.frequency === TaskFrequency.SPECIAL) {
        return !!data.startsAt && !!data.endsAt;
      }
      return true;
    },
    {
      message: 'Maxsus chastota uchun boshlanish va tugash sanasi talab qilinadi',
      path: ['startsAt'],
    }
  );

export type useFormSchemaType = z.infer<typeof schema>;
