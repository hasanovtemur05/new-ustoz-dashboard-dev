'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { FileField, TextAreaField, TextField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader, { useEasyFileUploader } from 'hooks/useFileUploader';
import { useState, useEffect } from 'react';
import { createSchemaWithPhotos } from './schema';
import type { ProductType } from 'modules/product/types';
import CustomSwitch from 'components/SwitchIsDreft';
import { useEditProduct } from 'modules/product/hooks/useEdit';
import { useCreateProduct } from 'modules/product/hooks/useCreate';
import NumberTextField from 'components/fields/Number';
import { useParams } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';

const DAYS = [
  { name: 'Dushanba', type: 'MONDAY' },
  { name: 'Seshanba', type: 'TUESDAY' },
  { name: 'Chorshanba', type: 'WEDNESDAY' },
  { name: 'Payshanba', type: 'THURSDAY' },
  { name: 'Juma', type: 'FRIDAY' },
  { name: 'Shanba', type: 'SATURDAY' },
  { name: 'Yakshanba', type: 'SUNDAY' },
];

const PRODUCT_TYPES = [
  { name: 'Jismoniy mahsulot', type: 'PHYSICAL' },
  { name: 'AI Assistant', type: 'AI_ASSISTANT' },
];

interface IProps {
  product?: ProductType;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const { categoryId } = useParams();
  const initialState = product?.title ? product?.isActive : true;
  const initialGiftState = product?.isActiveOnGift ?? false;
  const [switchState, setSwitchState] = useState<boolean>(initialState);
  const [giftState, setGiftState] = useState<boolean>(initialGiftState);
  const [state, setState] = useState(false);
  const { uploadFile: easyFileUpload } = useEasyFileUploader();

  // Photo field'lar soni
  const getInitialPhotoCount = () => {
    if (product?.photos && product.photos.length > 0) {
      return product.photos.length;
    }
    return 1;
  };

  const [photoCount, setPhotoCount] = useState(getInitialPhotoCount());

  const { uploadFile } = useFileUploader();
  const { triggerCreate, isPending: isInfoCreatePending } = useCreateProduct({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditProduct({
    id: product?.id,
    setSheetOpen,
  });

  // Dynamic schema yaratish
  const schema = createSchemaWithPhotos(photoCount);

  // Default values yaratish
  const getDefaultValues = () => {
    const baseValues = {
      title: product?.title || '',
      photo: product?.photo || '',
      price: product ? +product.price : '',
      cashPrice: product?.cashPrice ? +product.cashPrice : '',
      count: product ? +product.count : '',
      content: product?.content || '',
      isActive: product?.isActive ?? switchState,
      isActiveOnGift: product?.isActiveOnGift ?? giftState,
      workingHours: product?.workingHours || [],
      categoryId: categoryId || product?.categoryId || '',
      type: product?.type || 'PHYSICAL',
      openAiAssistantId: product?.openAiAssistantId || '',
    };

    // Dynamic photo values qo'shish
    const photoValues: Record<string, string> = {};
    for (let i = 1; i <= photoCount; i++) {
      if (product?.photos && product.photos[i - 1]) {
        photoValues[`photo${i}`] = product.photos[i - 1].photo;
      } else {
        photoValues[`photo${i}`] = '';
      }
    }

    return { ...baseValues, ...photoValues };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workingHours",
  });

  useEffect(() => {
    if (photoCount > 1) {
      const currentValues = form.getValues() as Record<string, any>;
      const newDefaultValues = getDefaultValues();
      const mergedValues: Record<string, any> = { ...newDefaultValues };

      Object.keys(currentValues).forEach((key) => {
        if (currentValues[key] !== undefined && currentValues[key] !== '') {
          mergedValues[key] = currentValues[key];
        }
      });

      form.reset(mergedValues);
    }
  }, [photoCount]);

  const addPhotoField = () => {
    setPhotoCount((prev) => prev + 1);
  };

  const removePhotoField = () => {
    if (photoCount > 1) {
      setPhotoCount((prev) => prev - 1);
    }
  };

  async function onSubmit(formValues: any) {
    setState(true);
    try {
      // Asosiy rasmni yuklash
      let mainPhoto = formValues.photo;
      if (formValues.photo instanceof File) {
        const uploadedPhoto = await uploadFile({ photo: formValues.photo }, 'photo');
        mainPhoto = uploadedPhoto.photo;
      }

      // Qo'shimcha rasmlarni yuklash
      const uploadedPhotos: string[] = [];

      for (let i = 1; i <= photoCount; i++) {
        const photoKey = `photo${i}`;
        const photo = formValues[photoKey];

        if (photo instanceof File) {
          const uploaded = await easyFileUpload(photo);
          uploadedPhotos.push(uploaded);
        } else if (typeof photo === 'string' && photo.trim() !== '') {
          uploadedPhotos.push(photo);
        }
      }

      const data = {
        title: formValues.title,
        content: formValues.content,
        photo: mainPhoto as string,
        photos: uploadedPhotos,
        price: +formValues.price,
        cashPrice: formValues.cashPrice ? +formValues.cashPrice : undefined,
        count: +formValues.count,
        categoryId: categoryId || formValues.categoryId,
        isActive: switchState,
        isActiveOnGift: giftState,
        workingHours: formValues.workingHours,
        type: formValues.type,
        openAiAssistantId: formValues.type === 'AI_ASSISTANT' ? formValues.openAiAssistantId : undefined,
      };

      if (product) {
        triggerEdit(data);
      } else {
        triggerCreate(data);
      }
    } catch (error) {
      setState(false);
      console.error('Upload error:', error);
      alert('Aniqlanmagan hatolik!');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Product nomi" required />
          <TextAreaField name="content" label="Product tarifi" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SelectField name="type" label="Mahsulot turi" data={PRODUCT_TYPES} required />
             {form.watch('type') === 'AI_ASSISTANT' && (
               <TextField name="openAiAssistantId" label="OpenAI Assistant ID" placeholder="asst_..." required />
             )}
          </div>
          <NumberTextField name="price" placeholder="Narxni kiriting (Coin)" label="Narxni kiriting (Coin)" required />
          <NumberTextField name="cashPrice" placeholder="So'mda narxi (Ixtiyoriy)" label="So'mda narxi (Ixtiyoriy)" />
          <FileField name="photo" label="Asosiy mahsulot rasmi" />
          <NumberTextField name="count" placeholder="Mahsulot soni" label="Mahsulot soni" required />
          
          <div className="flex flex-col gap-4">
            <CustomSwitch
              state={switchState}
              setState={setSwitchState}
              labelText={switchState ? "Product Ko'rinsin" : "Product Ko'rinmasin"}
            />
            <CustomSwitch
              state={giftState}
              setState={setGiftState}
              labelText={giftState ? "Sovg'a sifatida ko'rinsin" : "Sovg'a sifatida ko'rinmasin"}
            />
          </div>

          {/* Working Hours bo'limi */}
          <div className="flex gap-2 flex-col border p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Ish vaqti (Olib ketish uchun)</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ day: 'MONDAY', open: '09:00', close: '18:00' })}
                className="flex items-center gap-2 bg-transparent"
              >
                <Plus size={16} />
                Vaqt qo'shish
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2 border-b pb-2">
                <div className="flex-1">
                  <SelectField
                    name={`workingHours.${index}.day`}
                    label="Kun"
                    data={DAYS}
                    required
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`workingHours.${index}.open`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ochilish</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`workingHours.${index}.close`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yopilish</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>

          {/* Photos bo'limi */}
          <div className="flex gap-2 flex-col border p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Qo'shimcha rasmlar</h3>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={addPhotoField} className="flex items-center gap-2 bg-transparent">
                  <Plus size={16} />
                  Rasm qo'shish
                </Button>
                {photoCount > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removePhotoField}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Minus size={16} />
                    Olib tashlash
                  </Button>
                )}
              </div>
            </div>

            {Array.from({ length: photoCount }, (_, index) => (
              <div key={`photo-${index + 1}`} className="flex items-center gap-4">
                <div className="flex-1">
                  <FileField name={`photo${index + 1}`} label={`Mahsulot rasmi ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {product ? (
          <LoadingButton isLoading={isNotificationEditPending || state}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isInfoCreatePending || state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
