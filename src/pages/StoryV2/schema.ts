import { z } from 'zod';
import { MediaType } from 'modules/story-v2/types';
import { imageTypes, videoTypes } from 'constants/file';
import { BannerType } from 'modules/banner/types';

const isValidFileType = (file: File, validTypes: string[]) => {
  if (!file) return false;
  const fileExtension = file.name.split('.').pop()?.toUpperCase();
  return fileExtension ? validTypes.includes(fileExtension) : false;
};

const storyMediaSchema = z
  .object({
    mediaType: z.nativeEnum(MediaType, {
      errorMap: () => ({ message: "Media turi IMAGE yoki VIDEO bo'lishi kerak" }),
    }),
    mediaUrl: z.union([
      z.custom<File>((file) => file instanceof File && (isValidFileType(file, imageTypes) || isValidFileType(file, videoTypes)), {
        message: `Fayl turi ${[...imageTypes, ...videoTypes].join(', ')} dan biri bo'lishi kerak`,
      }),
      z.string({ message: 'Yaroqli URL kiritilishi kerak' }),
    ]),
    title: z.string().min(3, { message: "Media sarlavhasi kamida 3 belgidan iborat bo'lishi kerak" }),
    button: z.string().min(3, { message: "Tugma matni kamida 3 belgidan iborat bo'lishi kerak" }),
    link: z
      .string()
      .nullable()
      .transform((val) => val ?? '')
      .optional(),
    type: z.string().min(3, { message: "Media turi kamida 3 belgidan iborat bo'lishi kerak" }).optional(),
    deadline: z.string({ message: 'Tugash vaqti kiritilishi kerak' }),
    objectId: z
      .string()
      .nullable()
      .transform((val) => val ?? '')
      .optional(),
    id: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    console.log(data?.type, 'ttttttttttt');
    if (data.type === BannerType.LINK) {
      if (!data.link || typeof data.link !== 'string' || !z.string().url().safeParse(data.link).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['link'],
          message: 'Yaroqli link kiritilishi kerak',
        });
      }
    }
    if (data.type === BannerType.COURSE) {
      if (!data.objectId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['objectId'],
          message: 'Kursni tanlash talab qilinadi',
        });
      }
    }
  });

// StoryV2Type sxemasi
export const schema = z.object({
  title: z.string().optional(),
  thumbnailUrl: z.union([
    z.custom<File>((file) => file instanceof File && isValidFileType(file, imageTypes), {
      message: `Fayl turi ${imageTypes.join(', ')} dan biri bo'lishi kerak`,
    }),
    z.string({ message: 'Yaroqli URL kiritilishi kerak' }),
  ]),
  media: z.array(storyMediaSchema, { message: 'Kamida bitta media elementi kiritilishi kerak' }).min(1),
});

export type useFormSchemaType = z.infer<typeof schema>;
