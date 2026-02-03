import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import { useCreateLessonReward } from 'modules/course-reward-product/hooks/useCreate';
import { useEditLessonReward } from 'modules/course-reward-product/hooks/useEdit';
import { LessonReward, LessonRewardInputType, LessonRewardType } from 'modules/course-reward-product/types';

interface IProps {
  product?: LessonReward;
  setSheetOpen: (state: boolean) => void;
}

const typeData = [
  { type: LessonRewardType.COIN, name: 'Coin' },
  { type: LessonRewardType.PRODUCT, name: 'Mahsulot' },
  { type: LessonRewardType.PROMOCODE, name: 'Promocode' },
  { type: LessonRewardType.FILE, name: 'File' },
];

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const [state, setState] = useState(false);

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
          description: product?.description,
          type: product.type,
          file: product.file || '',
        }
      : {
          title: '',
          photo: '',
          description: '',
          file: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const firstValue = await uploadFile<LessonReward>(formValues, 'photo');
      let payload: LessonRewardInputType = {
        ...formValues,
        photo: firstValue.photo,
      };
      // Agar file File tipida bo'lsa, uni yuklash
      if (formValues.file && formValues.file instanceof File) {
        payload = await uploadFile<LessonRewardInputType>(formValues, 'file');
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

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Sovg'a nomi" required />
          <SelectField name="type" data={typeData} placeholder="Sovg'a turini tanlang..." label="Sovg'a turini tanglang" required />

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
