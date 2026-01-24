import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course, CourseInput } from 'modules/courses/types';
import useFileUploader from 'hooks/useFileUploader';
import { useCreateCourse } from 'modules/courses/hooks/useCreateCourse';
import { useEditCourse } from 'modules/courses/hooks/useEditCourse';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, SelectField, TextAreaField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import NumberTextField from 'components/fields/Number';
import KeywordField from 'components/fields/KeywordField';
import { useEffect, useState } from 'react';
import { SelectType } from 'pages/Certificate/CustomForm';
import { useTeachersList } from 'modules/teachers/hooks/useList';

const typeData = [
  { type: 'SUBJECT', name: 'Fan' },
  { type: 'PROFESSION', name: 'Kasb' },
];
const levelData = [
  { type: 'EASY', name: 'Oson' },
  { type: 'MEDIUM', name: "O'rtacha" },
  { type: 'HARD', name: 'Qiyin' },
];

const courseSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(3),
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
});

type courseFormSchema = z.infer<typeof courseSchema>;

interface IProps {
  course?: Course;
  setSheetOpen: (state: boolean) => void;
}

export default function CourseForm({ course, setSheetOpen }: IProps) {
  const [teachersData, setTeachersData] = useState<SelectType[]>([]);

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
          seoDescription: course?.seo?.description,
          seoKeywords: Array.isArray(course?.seo?.keywords) ? course?.seo?.keywords : course?.seo?.keywords?.split(',') || [],
          type: course.type,
          degree: course.degree,
          planLessonCount: course?.planLessonCount,
        }
      : {
          title: '',
          description: '',
          icon: '',
          type: '',
          degree: '',
          slug: '',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: [],
        },
  });

  async function onSubmit(formValues: courseFormSchema) {
    const value = await uploadFile<CourseInput>(formValues, 'icon');
    const withBanner = await uploadFile<CourseInput>(value, 'banner');
    // const whithTeacherPhoto = await uploadFile<CourseInput>(withBanner, 'teacherPhoto');

    const payload = {
      ...withBanner,
      seoKeywords: formValues.seoKeywords?.toString(),
    };

    if (course) {
      triggerCourseEdit(payload);
    } else {
      triggerCourseCreate(payload);
    }
  }

  useEffect(() => {
    let newArr: SelectType[] = [];
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
          <SelectField name="type" data={typeData} placeholder="Kurs turini tanlang..." label="Kurs turi" />
          <SelectField name="degree" data={levelData} placeholder="Kurs darajasini tanlang..." label="Kurs darajasi" />
          <SelectField name="teacherId" data={teachersData} placeholder="Kurs Ustozini tanlang..." label="Kurs Ustozi" />
          <NumberTextField name="planLessonCount" placeholder="Rejalashtirilgan darslar soni" label="Rejalashtirilgan darslar soni" required />
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
