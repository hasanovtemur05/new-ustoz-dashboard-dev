import { RecEnum } from 'modules/certificate/types';
import { z } from 'zod';

// Certificate schema
// Certificate schema
export const schema = z.object({
  degree: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
  photo: z.union([
    z.custom<File>(file => file instanceof File, { message: 'Rasm talab qilinadi' }),
    z.string().min(1, { message: 'Rasm talab qilinadi' }), // agar string URL bo‘lsa ham tekshiradi
  ]),
  courseId: z.string().min(1, { message: 'Kursni tanlang' }),
});

// Recommendation schema
export const recSchema = z.object({
  type: z.nativeEnum(RecEnum, { required_error: 'Sertifikat turini tanlang' }),
  photo: z.union([
    z.custom<File>(file => file instanceof File, { message: 'Rasm talab qilinadi' }),
    z.string().min(1, { message: 'Rasm talab qilinadi' }),
  ]),
  courseId: z.string().min(1, 'Kursni tanlang'),
});


// Types
export type useFormSchemaType = {
  degree?: string;
  type?: RecEnum;
  photo?: File | string;
  courseId: string;
};

// Recommendation form type
export type RecFormType = {
  type: RecEnum;
  photo?: File | string;
  courseId: string;
};
