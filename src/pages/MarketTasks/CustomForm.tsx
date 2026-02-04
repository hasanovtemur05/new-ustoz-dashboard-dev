import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, TextField, SelectField, DatePickerField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import { useCreateMarketTask } from 'modules/market-taskts/hooks/useCreate';
import { useEditMarketTask } from 'modules/market-taskts/hooks/useEdit';
import { IMarketTask, IMarketTaskInput } from 'modules/market-taskts/types';
import { FREQUENCY_OPTIONS, EVENT_OPTIONS, TYPE_OPTIONS, TaskType, TaskEvent, TaskFrequency } from 'modules/market-taskts/constants';
import { Label } from 'components/ui/label';
import { Switch } from 'components/ui/switch';
import { useSurveyList } from 'modules/survey/hooks/useList';

interface IProps {
  product?: IMarketTask;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const [state, setState] = useState(false);

  const { uploadFile } = useFileUploader();
  // const { surveys, isLoading: isSurveysLoading } = useSurveyList();
  const { data: surveys, isLoading: isSurveysLoading } = useSurveyList(20);

  const { triggerCreate } = useCreateMarketTask({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditMarketTask({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          title: product?.title,
          photo: product?.photo,
          points: +product?.points,
          description: product?.description,
          frequency: product?.frequency,
          event: product?.event,
          type: product?.type,
          surveyId: product?.surveyId,
          completedCourseCount: product?.completedCourseCount,
          isActive: product?.isActive,
          startsAt: product?.startsAt ? new Date(product.startsAt) : undefined,
          endsAt: product?.endsAt ? new Date(product.endsAt) : undefined,
        }
      : {
          title: '',
          photo: '',
          description: '',
          isActive: true,
        },
  });

  const selectedType = form.watch('type');
  const selectedEvent = form.watch('event');
  const selectedFrequency = form.watch('frequency');

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const firstValue = await uploadFile<IMarketTaskInput>(formValues, 'photo');
      const data: IMarketTaskInput = {
        ...firstValue,
        points: +firstValue.points,
        completedCourseCount: firstValue.completedCourseCount ? +firstValue.completedCourseCount : undefined,
        startsAt: firstValue.startsAt ? new Date(firstValue.startsAt).toISOString() : undefined,
        endsAt: firstValue.endsAt ? new Date(firstValue.endsAt).toISOString() : undefined,
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


  const surveyOptions = surveys.map((survey) => ({
    name: survey.question,
    type: survey.id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Topshiriq nomi" required />

          <NumberTextField name="points" placeholder="Coin miqdori" label="Coin miqdori" required />

          <FileField name={`photo`} label={`Topshiriq rasmi`} />

          <RichTextEditor name="description" label="Topshiriq tarifi" required />

          <SelectField name="frequency" label="Chastota" placeholder="Chastota tanlang" data={FREQUENCY_OPTIONS} required />

          <SelectField name="event" label="Hodisa" placeholder="Hodisa tanlang" data={EVENT_OPTIONS} required />

          {selectedEvent === TaskEvent.COMPLETE_COURSE && (
            <NumberTextField name="completedCourseCount" placeholder="Yakunlangan kurslar soni" label="Yakunlangan kurslar soni" required />
          )}

          <SelectField name="type" label="Turi" placeholder="Tur tanlang" data={TYPE_OPTIONS} required />


          {selectedType === TaskType.SURVEY && (
            <SelectField
              name="surveyId"
              label="So'rovnoma"
              placeholder={isSurveysLoading ? 'Yuklanmoqda...' : "So'rovnoma tanlang"}
              data={surveyOptions}
              required
            />
          )}

          <div className="flex items-center gap-2">
            <Switch id="isActive" checked={form.watch('isActive')} onCheckedChange={(checked) => form.setValue('isActive', checked)} />
            <Label htmlFor="isActive">Faol</Label>
          </div>

          {selectedFrequency === TaskFrequency.SPECIAL && (
            <>
              <DatePickerField name="startsAt" label="Boshlanish sanasi" placeholder="Sana tanlang" required />

              <DatePickerField name="endsAt" label="Tugash sanasi" placeholder="Sana tanlang" required />
            </>
          )}
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
