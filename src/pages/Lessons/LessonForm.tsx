import { z } from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateLesson } from 'modules/lessons/hooks/useCreateLesson';
import { useEditLesson } from 'modules/lessons/hooks/useEditLesson';
import { Form } from 'components/ui/form';
import { Lesson, LessonInput, LessonLinkType } from 'modules/lessons/types';
import { RichTextEditor, SelectField, TextField, TimePickerField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { convertSecondsToHMS } from 'utils/timeConverter';
import CustomSwitch from 'components/SwitchIsDreft';
import NumberTextField from 'components/fields/Number';
import MediaUploadField from 'components/fields/VideoUploder';
import useFileUploader from 'hooks/useFileUploader';
import { isYouTubeUrl } from 'utils/common';

const lessonSchema = z.object({
  title: z.string().min(3, "Dars nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  description: z.string().min(20, "Dars tavsifi kamida 20 ta belgidan iborat bo'lishi kerak"),
  link: z.union([z.string(), z.instanceof(File)]),
  duration: z.number().optional(),
  _duration: z.date().optional(),
  isSoon: z.boolean().optional(),
  linkType: z.nativeEnum(LessonLinkType, { message: 'Iltimos video turini tanlang' }),
  isActive: z.boolean().optional(),
  orderId: z.number().optional(),
  videoId: z.string().optional(),
});

type lessonFormSchema = z.infer<typeof lessonSchema>;

interface IProps {
  lesson?: Lesson;
  lastDataOrder?: number;
  setSheetOpen: (state: boolean) => void;
}

const initialDate = new Date();
initialDate.setHours(0, 0, 0);

const typeData = [
  { type: LessonLinkType.YOU_TUBE, name: 'You tube link' },
  { type: LessonLinkType.VIDEO, name: 'Yuklanadigan dars(file)' },
];

export default function LessonForm({ lesson, lastDataOrder: lastLessonOrder, setSheetOpen }: IProps) {
  const { moduleId } = useParams();
  const initialState = lesson?.title ? lesson.isSoon ?? false : false;
  const [isSoon, setIsSoon] = useState<boolean>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const initialActive = lesson?.title ? lesson.isActive ?? true : true;
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const { uploadFile } = useFileUploader('/file/bunny/stream');

  const { triggerLessonCreate, isPending: isLessonCreatePending } = useCreateLesson({ setSheetOpen });
  const { triggerLessonEdit, isPending: isLessonEditPending } = useEditLesson({
    id: lesson?.id,
    setSheetOpen,
  });

  const _duration = useMemo(() => {
    const value = new Date(initialDate);

    if (!lesson?.duration) return value;
    const { hours, minutes, seconds } = convertSecondsToHMS(lesson.duration);

    value.setHours(hours, minutes, seconds);
    return value;
  }, [lesson?.duration]);

  const form = useForm<lessonFormSchema>({
    resolver: zodResolver(lessonSchema),
    defaultValues: lesson
      ? {
          title: lesson.title,
          description: lesson.description,
          link: isYouTubeUrl(lesson.link) ? lesson.link : `https://iframe.mediadelivery.net/embed/504451/${lesson.link}`,
          duration: lesson.duration,
          linkType: lesson.linkType,
          _duration,
          isSoon: lesson.isSoon ?? false,
          isActive: lesson.isActive ?? true,
          orderId: lesson.orderId || 0,
        }
      : {
          title: '',
          description: '',
          link: '',
          duration: 0,
          linkType: LessonLinkType.YOU_TUBE,
          _duration: initialDate,
          isSoon: false,
          isActive: true,
          orderId: lastLessonOrder ? lastLessonOrder + 1 : 1,
        },
  });

  const type = form.watch('linkType');

  useEffect(() => {
    if (!lesson) {
      if (type === LessonLinkType.VIDEO) {
        form.setValue('link', '' as any);
      } else if (type === LessonLinkType.YOU_TUBE) {
        form.setValue('link', '');
      }
    }
  }, [type, form, lesson]);

  async function onSubmit(formValues: lessonFormSchema) {
    try {
      setIsLoading(true);

      const duration = Math.trunc(formValues._duration ? (formValues._duration.getTime() - new Date(initialDate).getTime()) / 1000 : 0);

      const formData = formValues.videoId ? { ...formValues, link: formValues.videoId } : { ...formValues };
      formData.duration = duration;
      delete formData._duration;

      const values =
        formData.linkType === LessonLinkType.VIDEO && formData.link instanceof File && !formData.videoId
          ? await uploadFile<LessonInput>(formData, 'link')
          : formData;

      const payload = {
        ...values,
        moduleId: moduleId as string,
        isActive: isActive,
        isSoon: isSoon,
      };

      if (lesson) {
        triggerLessonEdit(payload);
      } else {
        triggerLessonCreate(payload);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Dars nomi" required />

          <SelectField name="linkType" data={typeData} placeholder="Video turini tanlang..." label="Video turini tanlang" />

          {type === LessonLinkType.VIDEO ? (
            <div className="flex justify-between gap-3 items-center">
              <MediaUploadField name="link" label="Dars videosi" defaultValue={lesson?.link || ''} />
              <TextField name="videoId" label="Video Id kiriting" placeholder="124bd1da-6fba-4633-bdf0-f6738af91f6c" required />
            </div>
          ) : (
            <TextField name="link" label="YouTube havolasi" required />
          )}

          <div className="flex items-center justify-start gap-4">
            <TimePickerField name="_duration" label="Darsning davomiyligi" required />
            <NumberTextField name="orderId" placeholder="Tartib raqami" label="Tartib raqami" />
          </div>

          <div className="flex items-center justify-start gap-8">
            <div>
              <h4 className="mb-1">Tayyor yoki tez kunda</h4>
              <CustomSwitch state={isSoon} setState={setIsSoon} labelText={isSoon ? 'Tez kunda' : 'Tayyor'} />
            </div>
            <div>
              <h4 className="mb-1">Dars chiqarilishga tayyor yoki yo'q</h4>
              <CustomSwitch state={isActive} setState={setIsActive} labelText={isActive ? "Ko'rinadigan dars" : "Ko'rinmaydigan dars"} />
            </div>
          </div>

          <RichTextEditor name="description" label="Dars tavsifi" required />
        </div>

        <LoadingButton isLoading={isLoading || isLessonCreatePending || isLessonEditPending}>{lesson ? 'Tahrirlash' : 'Saqlash'}</LoadingButton>
      </form>
    </Form>
  );
}
