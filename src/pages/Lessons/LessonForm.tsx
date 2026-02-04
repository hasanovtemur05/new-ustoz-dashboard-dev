'use client';

import { z } from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateLesson } from 'modules/lessons/hooks/useCreateLesson';
import { useEditLesson } from 'modules/lessons/hooks/useEditLesson';
import { Form } from 'components/ui/form';
import { Lesson, LessonLinkType } from 'modules/lessons/types';
import { RichTextEditor, SelectField, TextField, TimePickerField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { convertSecondsToHMS } from 'utils/timeConverter';
import CustomSwitch from 'components/SwitchIsDreft';
import NumberTextField from 'components/fields/Number';
import MediaUploadField from 'components/fields/VideoUploder';
import { useEasyFileUploader } from 'hooks/useFileUploader';
import { baseMediaUrl } from 'services/api';

const lessonSchema = z.object({
  title: z.string().min(3, 'Kamida 3 ta belgi kiriting'),
  description: z.string().min(20, 'Kamida 20 ta belgi kiriting'),
  link: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  thumbnail: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  duration: z.number().optional(),
  _duration: z.date().optional(),
  isSoon: z.boolean().optional(),
  linkType: z.nativeEnum(LessonLinkType),
  isActive: z.boolean().optional(),
  orderId: z.number().min(1, 'Tartib raqami 1 dan katta bo\'lishi kerak').optional(),
  videoId: z.string().optional().nullable(),
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
  { type: LessonLinkType.YOU_TUBE, name: 'YouTube link' },
  { type: LessonLinkType.VIDEO, name: 'Yuklanadigan dars(file)' },
];

export default function LessonForm({ lesson, lastDataOrder: lastLessonOrder, setSheetOpen }: IProps) {
  const { moduleId } = useParams();
  const initialState = lesson?.title ? lesson.isSoon ?? false : false;
  const [isSoon, setIsSoon] = useState<boolean>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const initialActive = lesson?.title ? lesson.isActive ?? true : true;
  const [isActive, setIsActive] = useState<boolean>(initialActive);

  // ✅ useEasyFileUploader ishlatamiz
  const { uploadFile: uploadVideo } = useEasyFileUploader('/file/bunny/stream');
  const { uploadFile: uploadThumbnail } = useEasyFileUploader('/file');

  const { triggerLessonCreate, isPending: isLessonCreatePending } = useCreateLesson({ setSheetOpen });
  const { triggerLessonEdit, isPending: isLessonEditPending } = useEditLesson({ id: lesson?.id, setSheetOpen });

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
          thumbnail: lesson.thumbnail ? `${baseMediaUrl}/${lesson.thumbnail}` : undefined,
          linkType: lesson.linkType,
          link: lesson.linkType === LessonLinkType.YOU_TUBE ? lesson.link : '',
          videoId: lesson.linkType === LessonLinkType.VIDEO ? lesson.link : '',
          duration: lesson.duration,
          _duration,
          isSoon: lesson.isSoon ?? false,
          isActive: lesson.isActive ?? true,
          orderId: lesson.orderId ?? 0,
        }
      : {
          title: '',
          description: '',
          link: '',
          thumbnail: undefined,
          videoId: '',
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
        form.setValue('link', null);
        form.setValue('videoId', '');
      } else {
        form.setValue('link', '');
        form.setValue('videoId', null);
      }
    }
  }, [type, form, lesson]);

  async function onSubmit(formValues: lessonFormSchema) {
    try {
      setIsLoading(true);

      const duration = Math.trunc(
        formValues._duration ? (formValues._duration.getTime() - initialDate.getTime()) / 1000 : 0
      );

      const payloadData: any = {
        title: formValues.title,
        description: formValues.description,
        orderId: formValues.orderId,
        duration,
        moduleId: moduleId as string,
        isActive,
        isSoon,
        linkType: formValues.linkType,
      };

      // ✅ THUMBNAIL - File bo'lsa yuklash, string bo'lsa o'sha stringni yuborish
      if (formValues.thumbnail instanceof File) {
        console.log('📤 Thumbnail yuklanmoqda...');
        const thumbnailPath = await uploadThumbnail(formValues.thumbnail);
        payloadData.thumbnail = thumbnailPath || '';
      } else if (formValues.thumbnail && typeof formValues.thumbnail === 'string') {
        // Agar avvalgi rasm o'zgartirilmagan bo'lsa
        if (lesson?.thumbnail && formValues.thumbnail.includes(lesson.thumbnail)) {
          payloadData.thumbnail = lesson.thumbnail;
        } else {
          payloadData.thumbnail = formValues.thumbnail;
        }
      } else {
        payloadData.thumbnail = '';
      }

      // ✅ VIDEO LINK - YouTube yoki File
      if (formValues.linkType === LessonLinkType.YOU_TUBE) {
        // YouTube link
        const youtubeLink = typeof formValues.link === 'string' ? formValues.link.trim() : '';
        payloadData.link = youtubeLink || lesson?.link || '';
      } else if (formValues.linkType === LessonLinkType.VIDEO) {
        // Video file yuklash
        if (formValues.link instanceof File) {
          console.log('📤 Video yuklanmoqda...');
          const videoId = await uploadVideo(formValues.link);
          payloadData.link = videoId || formValues.videoId || '';
        } else {
          // Agar videoId kiritilgan bo'lsa
          payloadData.link = formValues.videoId || lesson?.link || '';
        }
      }

      console.log('✅ Yuborilayotgan ma\'lumotlar:', payloadData);

      lesson ? await triggerLessonEdit(payloadData) : await triggerLessonCreate(payloadData);
    } catch (e) {
      console.error('❌ Xatolik yuz berdi:', e);
      // Bu yerda toast yoki error message ko'rsatish mumkin
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 my-4">
          <TextField name="title" label="Dars nomi" required />
          
          <SelectField
            name="linkType"
            data={typeData}
            placeholder="Video turini tanlang..."
            label="Video turini tanlang"
          />

          <MediaUploadField
            name="thumbnail"
            label="Rasm yuklash"
            types={['JPG', 'PNG', 'JPEG', 'WEBP']}
            defaultValue={lesson?.thumbnail ? `${baseMediaUrl}/${lesson.thumbnail}` : undefined}
          />

          {type === LessonLinkType.VIDEO ? (
            <div className="flex justify-between gap-3 items-center">
              <MediaUploadField name="link" label="Dars videosi" />
              <TextField
                name="videoId"
                label="Video Id kiriting"
                placeholder="124bd1da-6fba-4633-bdf0-f6738af91f6c"
              />
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
              <CustomSwitch
                state={isSoon}
                setState={setIsSoon}
                labelText={isSoon ? 'Tez kunda' : 'Tayyor'}
              />
            </div>
            <div>
              <h4 className="mb-1">Dars chiqarilishga tayyor yoki yo'q</h4>
              <CustomSwitch
                state={isActive}
                setState={setIsActive}
                labelText={isActive ? "Ko'rinadigan dars" : "Ko'rinmaydigan dars"}
              />
            </div>
          </div>

          <RichTextEditor name="description" label="Dars tavsifi" required />
        </div>

        <LoadingButton isLoading={isLoading || isLessonCreatePending || isLessonEditPending}>
          {lesson ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}