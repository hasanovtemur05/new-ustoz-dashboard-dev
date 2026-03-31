import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField, TextField, RichTextEditor } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { boxSchema, BoxFormValues } from './schema';
import { useCreateBox } from 'modules/lesson-reward-box/hooks/useCreate';
import { useEditBox } from 'modules/lesson-reward-box/hooks/useEdit';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useCourseLessonsList } from 'modules/lessons/hooks/useCourseLessonsList';
import useFileUploader from 'hooks/useFileUploader';
import { useEffect, useState } from 'react';

import { cleanEmptyStrings } from 'utils/clearEmptyKeys';

interface IProps {
  box?: ILessonRewardBox;
  setSheetOpen: (state: boolean) => void;
  courseId: string;
}

export default function CustomForm({ box, setSheetOpen, courseId }: IProps) {
  const { uploadFile } = useFileUploader();
  const { data: courses } = useCoursesList();
  const [selectedCourseId, setSelectedCourseId] = useState(courseId || box?.courseId || '');
  const { data: lessons } = useCourseLessonsList(selectedCourseId);

  const { mutateAsync: createBox, isPending: isCreating } = useCreateBox(selectedCourseId, () => setSheetOpen(false));
  const { mutateAsync: editBox, isPending: isEditing } = useEditBox(selectedCourseId, box?.id || '', () => setSheetOpen(false));

  const form = useForm<BoxFormValues>({
    resolver: zodResolver(boxSchema),
    defaultValues: box
      ? {
          lessonId: box.lessonId,
          courseId: box.courseId,
          title: box.title,
          image: box.image,
          description: box.description || '',
        }
      : {
          lessonId: '',
          courseId: selectedCourseId,
          title: '',
          image: '',
          description: '',
        },
  });

  const watchedCourseId = form.watch('courseId');

  useEffect(() => {
    if (watchedCourseId) {
      setSelectedCourseId(watchedCourseId);
    }
  }, [watchedCourseId]);

  const onSubmit = async (values: BoxFormValues) => {
    try {
      const uploaded = await uploadFile<any>(values, 'image');
      const payload = cleanEmptyStrings(uploaded);
      if (box) {
        await editBox(payload);
      } else {
        await createBox(payload);
      }
    } catch (e) {
      console.error('Error creating/editing box:', e);
    }
  };

  const courseData = courses?.map((c) => ({ name: c.title, type: c.id })) || [];
  const lessonData = lessons?.map((l) => ({ name: l.title, type: l.id })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <SelectField name="courseId" data={courseData} label="Kurs" placeholder="Kursni tanlang" required />
        <SelectField name="lessonId" data={lessonData} label="Dars" placeholder="Darsni tanlang" required />
        <TextField name="title" label="Sarlavha" required />
        <FileField name="image" label="Rasm" required />
        <RichTextEditor name="description" label="Tavsif" />
        <LoadingButton isLoading={isCreating || isEditing}>
          {box ? 'Saqlash' : 'Yaratish'}
        </LoadingButton>
      </form>
    </Form>
  );
}
