import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import CustomSwitch from 'components/SwitchIsDreft';
import NumberTextField from 'components/fields/Number';
import { FortunaProduct, FortunaProductType } from 'modules/fortuna-product/types';
import { useEditProductFortuna } from 'modules/fortuna-product/hooks/useEdit';
import { useCreateProductFortuna } from 'modules/fortuna-product/hooks/useCreate';

interface IProps {
  product?: FortunaProduct;
  setSheetOpen: (state: boolean) => void;
}

const typeData = [
  { type: FortunaProductType.COIN, name: 'Coin' },
  { type: FortunaProductType.PRODUCT, name: 'Mahsulot' },
  { type: FortunaProductType.PROMOCODE, name: 'Promocode' },
  { type: FortunaProductType.EMPTY, name: "Bo'sh bo'lim" },
];

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const initialState = product?.title ? product?.isActive : true;
  const [switchState, setSwitchState] = useState<boolean>(initialState);
  const [state, setState] = useState(false);

  const { uploadFile } = useFileUploader();

  const { triggerCreate } = useCreateProductFortuna({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditProductFortuna({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          title: product?.title,
          photo: product?.photo,
          value: +product?.value,
          probability: +product?.probability,
          count: +product?.count,
          content: product?.content,
          isActive: product?.isActive,
          type: product.type,
        }
      : {
          title: '',
          photo: '',
          content: '',
          isActive: switchState,
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const firstValue = await uploadFile<FortunaProduct>(formValues, 'photo');
      const data = {
        ...firstValue,
        probability: +firstValue.probability,
        count: +firstValue.count,
        value: +firstValue.value,
        isActive: switchState,
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

  const type = form.watch('type');

  // empty  => isEmpty true qolgan vaqt false
  // product => count , probobility
  // coin => value

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Sovg'a nomi" required />
          <NumberTextField name="probability" placeholder="0 dan 10 gacha oraliqda" label="Sovg'ani tushish ehtimoligi" required />
          <SelectField name="type" data={typeData} placeholder="Sovg'a turini tanlang..." label="Sovg'a turini tanglang" required />

          {type === FortunaProductType.COIN && <NumberTextField name="value" placeholder="Coin miqdori" label="Coin miqdori" required />}

          {(type === FortunaProductType.PROMOCODE || type === FortunaProductType.PRODUCT) && (
            <NumberTextField name="count" placeholder="Promocode soni" label="Promocode soni" required />
          )}

          {type === FortunaProductType.PRODUCT && <FileField name={`photo`} label={`Mahsulot rasmi `} />}

          <RichTextEditor name="content" label="Product tarifi" />

          <CustomSwitch
            state={switchState}
            setState={setSwitchState}
            labelText={product?.isActive || switchState ? "Product Ko'rinsin" : "Product Ko'rinmasin "}
          />
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
