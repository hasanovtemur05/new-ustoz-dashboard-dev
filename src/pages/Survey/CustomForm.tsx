import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { TextField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import { useCreateSurvey } from 'modules/survey/hooks/useCreate';
import { useEditSurvey } from 'modules/survey/hooks/useEdit';
import { ISurvey, ISurveyInput } from 'modules/survey/types';
import { CONTEXT_OPTIONS, SurveyContext } from 'modules/survey/constants';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useCourseLessonsList } from 'modules/lessons/hooks/useCourseLessonsList';
import { Button } from 'components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface IProps {
  product?: ISurvey;
  setSheetOpen: (state: boolean) => void;
}

type FormValues = useFormSchemaType & {
  options: { value: string }[];
};

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const [state, setState] = useState(false);

  const { data: courses, isLoading: isCoursesLoading } = useCoursesList();

  const { triggerCreate } = useCreateSurvey({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditSurvey({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          title: product?.title,
          question: product?.question,
          context: product?.context,
          points: product?.points,
          options: product?.options?.map((opt) => ({ value: opt })) || [],
          courseId: product?.courseId,
          lessonId: product?.lessonId,
        }
      : {
          title: '',
          question: '',
          context: undefined,
          points: undefined,
          options: [],
          courseId: undefined,
          lessonId: undefined,
        },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control: form.control,
  });

  const selectedContext = form.watch('context');
  const selectedCourseId = form.watch('courseId');

  const { data: lessons, isLoading: loadingLessons } = useCourseLessonsList(selectedCourseId || '');

  async function onSubmit(formValues: FormValues) {
    setState(true);
    try {
      const data: ISurveyInput = {
        title: formValues.title,
        question: formValues.question,
        context: formValues.context,
        points: formValues.points ? +formValues.points : undefined,
        options: formValues.options?.map((opt) => opt.value).filter((opt) => opt.trim() !== ''),
        courseId: formValues.courseId,
        lessonId: formValues.lessonId,
      };
      if (product) {
        triggerEdit(data);
      } else {
        triggerCreate(data);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setState(false);
    }
  }


  const courseOptions =
    courses?.map((course) => ({
      name: course.title,
      type: course.id,
    })) || [];

  const lessonOptions =
    lessons?.map((lesson) => ({
      name: lesson.title,
      type: lesson.id,
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Sarlavha" required />

          <TextField name="question" label="Savol" required />

          <SelectField name="context" label="Kontekst" placeholder="Kontekst tanlang" data={CONTEXT_OPTIONS} required />

          <NumberTextField name="points" placeholder="Beriladigan coin" label="Coin" />

          {selectedContext === SurveyContext.COURSE && (
            <SelectField
              name="courseId"
              label="Kurs"
              placeholder={isCoursesLoading ? 'Yuklanmoqda...' : 'Kurs tanlang'}
              data={courseOptions}
              required
            />
          )}

          {selectedContext === SurveyContext.COURSE && selectedCourseId && (
            <SelectField
              name="lessonId"
              label="Dars"
              placeholder={loadingLessons ? 'Yuklanmoqda...' : 'Dars tanlang'}
              data={lessonOptions}
            />
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Javob variantlari</label>
              <Button type="button" size="sm" variant="outline" onClick={() => append({ value: '' })} className="gap-1">
                <Plus className="h-4 w-4" />
                Variant qo'shish
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <TextField name={`options.${index}.value`} placeholder={`${index + 1}-variant`} />
                </div>
                <Button type="button" size="icon" variant="destructive" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">Javob variantlari yo'q. "Variant qo'shish" tugmasini bosing.</p>
            )}
          </div>
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
