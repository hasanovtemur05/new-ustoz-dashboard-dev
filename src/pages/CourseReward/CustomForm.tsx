import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl } from 'components/ui/form';
import { FileField, RichTextEditor, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState, useEffect } from 'react';
import { schema, useFormSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import { useCreateLessonReward } from 'modules/course-reward-product/hooks/useCreate';
import { useEditLessonReward } from 'modules/course-reward-product/hooks/useEdit';
import { LessonReward, LessonRewardInputType, LessonRewardType } from 'modules/course-reward-product/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useCourseLessonsList } from 'modules/lessons/hooks/useCourseLessonsList';
import { Switch } from 'components/ui/switch';
import { Button } from 'components/ui/button';

interface IProps {
  product?: LessonReward;
  setSheetOpen: (state: boolean) => void;
}

const typeData = [
  { type: LessonRewardType.COIN, name: 'Coin' },
  { type: LessonRewardType.PRODUCT, name: 'Mahsulot' },
  { type: LessonRewardType.PROMOCODE, name: 'Promocode' },
  { type: LessonRewardType.FILE, name: 'File' },
  { type: LessonRewardType.AMATEUR_CERTIFICATE, name: 'Havaskor Sertifikat' },
  { type: LessonRewardType.PROGRESSIVE_CERTIFICATE, name: 'Yuksaluvchi Sertifikat' },

];

export type SelectType = { name: string; type: string; disabled?: boolean };

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [lessonsData, setLessonsData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();

  const { uploadFile } = useFileUploader();

  const { triggerCreate } = useCreateLessonReward({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditLessonReward({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
        title: product?.title,
        photo: product?.photo,
        value: product?.value ? +product?.value : undefined,
        count: product?.count ? +product?.count : undefined,
        description: product?.description || '',
        type: product.type,
        file: product.file || '',
        isPartial: product.isPartial || false,
        courseId: product.courseId || '',
        parts: product.parts?.map(p => ({ ...p, value: p.value ? +p.value : undefined })) || [],
      }
      : {
        title: '',
        photo: '',
        description: '',
        file: '',
        isPartial: false,
        courseId: '',
        parts: [],
      },
  });

  const watchedCourseId = form.watch('courseId');
  const { data: lessonsList } = useCourseLessonsList(watchedCourseId || '');

  const { fields: partsFields, append, remove } = useFieldArray({
    control: form.control,
    name: 'parts',
  });

  useEffect(() => {
    let newArr: SelectType[] = [];
    if (coursesList) {
      coursesList.forEach((el) =>
        newArr.push({
          name: el.title,
          type: el.id,
        })
      );
    }
    setCoursesData(newArr);
  }, [coursesList]);

  useEffect(() => {
    if (lessonsList) {
      const newArr: SelectType[] = lessonsList.map((el) => ({
        name: `${el.orderId}. ${el.title}`,
        type: el.id,
      }));
      setLessonsData(newArr);
    } else {
      setLessonsData([]);
    }
  }, [lessonsList]);

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const firstValue = await uploadFile<LessonRewardInputType>(formValues as any, 'photo');
      let payload: any = {
        ...formValues,
      };

      if (firstValue.photo) {
        payload.photo = firstValue.photo;
      } else {
        delete payload.photo;
      }

      if (!payload.file) delete payload.file;
      if (!payload.count) delete payload.count;
      if (payload.value === undefined || payload.value === '') delete payload.value;
      if (!payload.courseId) delete payload.courseId;

      if (payload.isPartial && payload.parts) {
        const uploadedParts = await Promise.all(
          payload.parts.map(async (part: any) => {
            const processedPart = { 
              title: part.title, 
              value: Number(part.value) || 0, 
              photo: '',
            };
            if (part.photo && part.photo instanceof File) {
              const res = await uploadFile<any>(part, 'photo');
              processedPart.photo = res.photo;
            } else if (typeof part.photo === 'string') {
              processedPart.photo = part.photo;
            }
            return processedPart;
          })
        );
        payload.parts = uploadedParts;
      } else {
        payload.parts = [];
      }

      if (product) {
        triggerEdit(payload);
      } else {
        triggerCreate(payload);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setState(false);
    }
  }

  const type = form.watch('type');
  const isPartial = form.watch('isPartial');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Sovg'a nomi" required />
          <SelectField name="type" data={typeData} placeholder="Sovg'a turini tanlang..." label="Sovg'a turini tanglang" required />

          {loadingCourses ? (
            <SelectField name="courseId" data={[]} placeholder="Kurslar hali yuklanmagan..." label="Kurslar hali yuklanmagan" />
          ) : (
            <SelectField name="courseId" data={coursesData} placeholder="Kursni tanlang..." label="Kursni tanglang" />
          )}

          <FormField
            control={form.control}
            name="isPartial"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Qisman sovg'a (isPartial)</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {isPartial && (
            <div className="flex flex-col gap-4 border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h3 className="font-semibold text-lg">Qismlar (Parts)</h3>
              {partsFields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 border bg-white dark:bg-gray-800 p-4 rounded-lg relative">
                  <TextField name={`parts.${index}.title`} label="Nomi" required />
                  <FileField name={`parts.${index}.photo`} label="Rasm" />
                  <NumberTextField name={`parts.${index}.value`} label="Qiymati" required />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="absolute right-2 top-2 h-8 w-8">
                    X
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ title: '', photo: '', value: 0 })}>
                Qism qo'shish
              </Button>
            </div>
          )}


          {type === LessonRewardType.COIN && <NumberTextField name="value" placeholder="Coin miqdori" label="Coin miqdori" required />}

          {type === LessonRewardType.PROMOCODE && <NumberTextField name="count" placeholder="Promocode soni" label="Promocode soni" required />}

          {type === LessonRewardType.PRODUCT && <FileField name={`photo`} label={`Mahsulot rasmi `} />}

          {type === LessonRewardType.FILE && <FileField name={`file`} label={`Mukofot fayli`} />}

          <RichTextEditor name="description" label="Product tarifi" />
        </div>
        {product ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
