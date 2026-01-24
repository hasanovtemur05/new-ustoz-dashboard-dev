'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Course, CourseInput } from 'modules/courses/types';
import useFileUploader from 'hooks/useFileUploader';
import { useCreateCourse } from 'modules/courses/hooks/useCreateCourse';
import { useEditCourse } from 'modules/courses/hooks/useEditCourse';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, SelectField, TextAreaField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import NumberTextField from 'components/fields/Number';
import KeywordField from 'components/fields/KeywordField';
import { useEffect, useState } from 'react';
import type { SelectType } from 'pages/Certificate/CustomForm';
import { useTeachersList } from 'modules/teachers/hooks/useList';
import MediaUploadField from 'components/fields/VideoUploder';
import CustomSwitch from 'components/SwitchIsDreft';

const typeData = [
  { type: 'SUBJECT', name: 'Fan' },
  { type: 'PROFESSION', name: 'Kasb' },
];
const levelData = [
  { type: 'EASY', name: 'Oson' },
  { type: 'MEDIUM', name: "O'rtacha" },
  { type: 'HARD', name: 'Qiyin' },
];

const pricingTypeData = [
  { type: 'FREE', name: 'Bepul' },
  { type: 'PAID', name: 'Pullik' },
  { type: 'TOURISM', name: 'Turizm' },
];

const courseSchema = z.discriminatedUnion('pricingType', [
  // FREE course schema
  z.object({
    pricingType: z.literal('FREE'),
    slug: z.string().min(3),
    title: z.string().min(3),
    isActive: z.boolean().optional(),
    teacherId: z.string(),
    description: z.string().min(10),
    icon: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    banner: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    type: z.string().min(3),
    degree: z.string().min(3),
    planLessonCount: z.number(),
    seoTitle: z.string().min(50, { message: 'title kamida 50 ta harifdan iborat text kirgazing' }).max(65, {
      message: 'title  maximal 65 ta harifdan iborat text kirgazing',
    }),
    seoDescription: z
      .string()
      .min(120, {
        message: 'description uchun kamida 120 ta harifdan iforat text kirgazing',
      })
      .max(320, {
        message: 'description maximal 320 ta harifdan iforat text kirgazing',
      }),
    seoKeywords: z.union([z.array(z.string()).min(3, { message: "Kamida 3 kalit so'z kiriting" }), z.string()]),
  }),
  // PAID course schema
  z.object({
    pricingType: z.literal('PAID'),
    slug: z.string().min(3),
    title: z.string().min(3),
    isActive: z.boolean().optional(),

    teacherId: z.string(),
    description: z.string().min(10),
    icon: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    banner: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    price: z.number().min(0, { message: "Narx 0 dan katta bo'lishi kerak" }),
    type: z.string().min(3),
    degree: z.string().min(3),
    planLessonCount: z.number(),
    seoTitle: z.string().min(50, { message: 'title kamida 50 ta harifdan iborat text kirgazing' }).max(65, {
      message: 'title  maximal 65 ta harifdan iborat text kirgazing',
    }),
    seoDescription: z
      .string()
      .min(120, {
        message: 'description uchun kamida 120 ta harifdan iforat text kirgazing',
      })
      .max(320, {
        message: 'description maximal 320 ta harifdan iforat text kirgazing',
      }),
    seoKeywords: z.union([z.array(z.string()).min(3, { message: "Kamida 3 kalit so'z kiriting" }), z.string()]),
  }),
  // TOURISM course schema
  z.object({
    pricingType: z.literal('TOURISM'),
    slug: z.string().min(3),
    title: z.string().min(3),
    isActive: z.boolean().optional(),
    teacherId: z.string(),
    description: z.string().min(10),
    icon: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    banner: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string().min(1, { message: 'Rasm talab qilinadi' }),
    ]),
    audioLink: z.union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Audio fayl talab qilinadi',
      }),
      z.string().min(1, { message: 'Audio fayl talab qilinadi' }),
    ]),
    type: z.string().min(3),
    degree: z.string().min(3),
    planLessonCount: z.number(),
    seoTitle: z.string().min(50, { message: 'title kamida 50 ta harifdan iborat text kirgazing' }).max(65, {
      message: 'title  maximal 65 ta harifdan iborat text kirgazing',
    }),
    seoDescription: z
      .string()
      .min(120, {
        message: 'description uchun kamida 120 ta harifdan iforat text kirgazing',
      })
      .max(320, {
        message: 'description maximal 320 ta harifdan iforat text kirgazing',
      }),
    seoKeywords: z.union([z.array(z.string()).min(3, { message: "Kamida 3 kalit so'z kiriting" }), z.string()]),
  }),
]);

type courseFormSchema = z.infer<typeof courseSchema>;

interface IProps {
  course?: Course;
  setSheetOpen: (state: boolean) => void;
}

export default function CourseForm({ course, setSheetOpen }: IProps) {
  const [teachersData, setTeachersData] = useState<SelectType[]>([]);
  const initialActive = course?.title ? course.isActive ?? true : true;
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const { uploadFile, isPending: isFileUpload } = useFileUploader();
  const { triggerCourseCreate, isPending: isCourseCreatePending } = useCreateCourse({ setSheetOpen });
  const { triggerCourseEdit, isPending: isCourseEditPending } = useEditCourse({
    id: course?.id,
    setSheetOpen,
  });

  const { data: coursesList } = useTeachersList(1, 50);

  const form = useForm<courseFormSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          title: course.title,
          description: course.description,
          slug: course.slug,
          icon: course.icon,
          teacherId: course.teacherId,
          banner: course.banner,
          seoTitle: course?.seo?.title,
          isActive: course.isActive ?? true,

          seoDescription: course?.seo?.description,
          seoKeywords: Array.isArray(course?.seo?.keywords) ? course?.seo?.keywords : course?.seo?.keywords?.split(',') || [],
          pricingType: course.pricingType || 'FREE',
          ...(course.pricingType === 'PAID'
            ? {
                price: course.price || 0,
                type: course.type,
                degree: course.degree,
                planLessonCount: course?.planLessonCount,
              }
            : course.pricingType === 'TOURISM'
            ? {
                audioLink: course.audioLink || '',
                type: course.type,
                degree: course.degree,
                planLessonCount: course?.planLessonCount,
              }
            : {
                type: course.type,
                degree: course.degree,
                planLessonCount: course?.planLessonCount,
              }),
        }
      : {
          title: '',
          description: '',
          icon: '',
          slug: '',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: [],
          pricingType: 'FREE',
          type: '',
          degree: '',
          planLessonCount: 0,
          isActive: false,
        },
  });

  const pricingType = form.watch('pricingType');

  async function onSubmit(formValues: courseFormSchema) {
    try {
      const withIcon = await uploadFile<CourseInput>(formValues, 'icon');
      const withBanner = await uploadFile<CourseInput>(withIcon, 'banner');

      const basePayload = {
        title: withBanner.title,
        description: withBanner.description,
        seoTitle: withBanner.seoTitle,
        seoDescription: withBanner.seoDescription,
        seoKeywords: formValues.seoKeywords?.toString(),
        banner: withBanner.banner,
        icon: withBanner.icon,
        slug: withBanner.slug,
        teacherId: withBanner.teacherId,
        pricingType: withBanner.pricingType,
        type: withBanner.type,
        degree: withBanner.degree,
        planLessonCount: withBanner.planLessonCount,
        isActive, // 🔥 har doim mavjud
      };

      let finalPayload: any = { ...basePayload };

      switch (formValues.pricingType) {
        case 'PAID':
          finalPayload = {
            ...basePayload,
            price: withBanner.price,
          };
          break;

        case 'TOURISM': {
          const withAudio = await uploadFile<CourseInput>(withBanner, 'audioLink');
          finalPayload = {
            ...basePayload,
            audioLink: withAudio.audioLink,
          };
          break;
        }

        default:
          break;
      }

      if (course) {
        triggerCourseEdit(finalPayload);
      } else {
        triggerCourseCreate(finalPayload);
      }
    } catch (err) {
      console.error('❌ onSubmit error:', err);
    }
  }

  useEffect(() => {
    const newArr: SelectType[] = [];
    coursesList.forEach((el) =>
      newArr.push({
        name: el.fullname,
        type: el.id,
      })
    );
    setTeachersData(newArr);
  }, [coursesList]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Kurs nomi" required />
          <TextField name="slug" label="Slug" placeholder="no-code-kursi" required />
          <CustomSwitch state={isActive} setState={setIsActive} labelText={isActive ? "Ko'rinadigan dars" : "Ko'rinmaydigan dars"} />

          <SelectField name="pricingType" data={pricingTypeData} placeholder="Kurs turini tanlang..." label="Narxlash turi" />

          {pricingType === 'FREE' && (
            <>
              <SelectField name="type" data={typeData} placeholder="Kurs turini tanlang..." label="Kurs turi" />
              <SelectField name="degree" data={levelData} placeholder="Kurs darajasini tanlang..." label="Kurs darajasi" />
              <NumberTextField
                name="planLessonCount"
                placeholder="Rejalashtirilgan darslar soni"
                label="Rejalashtirilgan darslar soni"
                required
              />
            </>
          )}

          {pricingType === 'PAID' && (
            <>
              <NumberTextField name="price" placeholder="Kurs narxi" label="Kurs narxi (so'm)" required />
              <SelectField name="type" data={typeData} placeholder="Kurs turini tanlang..." label="Kurs turi" />
              <SelectField name="degree" data={levelData} placeholder="Kurs darajasini tanlang..." label="Kurs darajasi" />
              <NumberTextField
                name="planLessonCount"
                placeholder="Rejalashtirilgan darslar soni"
                label="Rejalashtirilgan darslar soni"
                required
              />
            </>
          )}

          {pricingType === 'TOURISM' && (
            <>
              <MediaUploadField name="audioLink" label="Audio fayl" types={['MP3', 'WAV', 'M4A', 'AAC', 'OGG', 'FLAC']} required />
              <SelectField name="type" data={typeData} placeholder="Kurs turini tanlang..." label="Kurs turi" />
              <SelectField name="degree" data={levelData} placeholder="Kurs darajasini tanlang..." label="Kurs darajasi" />
              <NumberTextField
                name="planLessonCount"
                placeholder="Rejalashtirilgan darslar soni"
                label="Rejalashtirilgan darslar soni"
                required
              />
            </>
          )}

          <SelectField name="teacherId" data={teachersData} placeholder="Kurs Ustozini tanlang..." label="Kurs Ustozi" />
          <RichTextEditor name="description" label="Dars tavsifi" required />
          <FileField name="icon" label="Icon rasmi" required />
          <FileField name="banner" label="Banner rasmi" required />
          <hr />
          <TextField
            name="seoTitle"
            label="Seo title - (50 - 65)"
            placeholder="Bepul Targeting Kursi - Ustoz Aida Bilan O'rganing | Tezroq Boshlang"
            required
          />
          <TextAreaField
            name="seoDescription"
            label="Seo description (120 - 320)"
            placeholder="Targeting kursini ustoz aida o'rganing . Kursimiz davomida  Reklama strategiyalarini tuzish, mijozlarni aniq aniqlash, va onlayn savdoni oshirishni o'rganib, o'z biznesingiz yoki brendingiz uchun muvaffaqiyatli targeting yaratishga erishing. Bepul darslar bilan boshlang!"
            required
          />
          <KeywordField
            name="seoKeywords"
            label="Seo seoKeywords"
            placeholder="Target reklama, pul ishlash, targeting kurslar, bepul kurslar"
            required
          />
        </div>
        {course ? (
          <LoadingButton isLoading={isFileUpload || isCourseEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isFileUpload || isCourseCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
