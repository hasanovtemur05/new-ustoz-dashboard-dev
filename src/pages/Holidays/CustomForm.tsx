import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, TextField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useGlobalFileUploader } from 'hooks/useGlobalFileUploader';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { IHolidaysTypes } from 'modules/holidays/types';
import { useEditHolidays } from 'modules/holidays/hooks/useEdit';
import { useCreateHolidays } from 'modules/holidays/hooks/useCreate';
import { Button } from 'components/ui/button';
import { X } from 'lucide-react';

interface IProps {
  holiday?: IHolidaysTypes;
  setSheetOpen: (state: boolean) => void;
}

const LANGUAGES = [
  { label: 'O\'zbekcha', value: 'uz' },
  { label: 'Ruscha', value: 'ru' },
  { label: 'Inglizcha', value: 'en' },
];

const REGION_OPTIONS = [
  { name: 'O\'zbekiston', type: 'uz' },
  { name: 'Rossiya', type: 'ru' },
  { name: 'Amerika', type: 'en' },
];

export default function CustomForm({ holiday, setSheetOpen }: IProps) {
  const [state, setState] = useState(false);
  const [translationFields, setTranslationFields] = useState<string[]>(['uz']);
  const [oldPhoto, setOldPhoto] = useState<string | null>(holiday?.photo || null);
  const { prepareFormData } = useGlobalFileUploader();

  const { triggerCreate, isPending: isCreatePending } = useCreateHolidays({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isEditPending } = useEditHolidays({
    id: holiday?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: holiday
      ? {
          photo: holiday?.photo,
          day: holiday?.day,
          month: holiday?.month,
          region: holiday?.region,
          translations: holiday?.translations || [{ language: 'uz', name: '', id: '' }],
        }
      : {
          photo: '',
          day: 1,
          month: 1,
          region: '',
          translations: [{ language: 'uz', name: '', id: '' }],
        },
  });

  useEffect(() => {
    if (holiday?.translations) {
      const existingLangs = holiday.translations.map(t => t.language);
      setTranslationFields(existingLangs);
    }
  }, [holiday]);

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      // Tahrirlashda eski rasmni saqlash (yangi tanlansa o'zgaradi)
      const photoToSend = formValues.photo instanceof File ? formValues.photo : oldPhoto;
      const formData = prepareFormData({
        ...formValues,
        photo: photoToSend,
      });
      
      console.log('FormData yuborish:', {
        day: formValues.day,
        month: formValues.month,
        region: formValues.region,
        photoType: photoToSend instanceof File ? 'File' : typeof photoToSend,
        translationsCount: formValues.translations?.length,
      });

      if (holiday) {
        triggerEdit(formData as any);
      } else {
        triggerCreate(formData as any);
      }
    } catch (error) {
      setState(false);
      console.error('Bayram qo\'shishda xatolik:', error);
      alert(`Xatolik: ${error instanceof Error ? error.message : 'Aniqlanmagan hatolik'}`);
    }
  }

  const addTranslation = (language: string) => {
    if (!translationFields.includes(language)) {
      setTranslationFields([...translationFields, language]);
      const currentTranslations = form.getValues('translations') || [];
      form.setValue('translations', [...currentTranslations, { language, name: '', id: '' }]);
    }
  };

  const removeTranslation = (language: string) => {
    setTranslationFields(translationFields.filter(l => l !== language));
    const currentTranslations = form.getValues('translations') || [];
    form.setValue(
      'translations',
      currentTranslations.filter(t => t.language !== language)
    );
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col my-4">
          <FileField name="photo" label="Bayram rasmi" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Kun</label>
              <select
                {...form.register('day', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Oy</label>
              <select
                {...form.register('month', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          <SelectField
            name="region"
            label="Hudud (ixtiyoriy)"
            data={REGION_OPTIONS}
            placeholder="Hudud tanlang..."
          />

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Tarjimalar</h3>
            
            {translationFields.map((lang, index) => (
              <div key={lang} className="mb-4 p-3 border rounded">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">
                    {LANGUAGES.find(l => l.value === lang)?.label}
                  </span>
                  {translationFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTranslation(lang)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <input
                  {...form.register(`translations.${index}.language`)}
                  type="hidden"
                  value={lang}
                />
                <TextField
                  name={`translations.${index}.name`}
                  label="Bayram nomi"
                  required
                />
              </div>
            ))}

            <div className="mt-4">
              <label className="text-sm font-medium">Tarjima qo'shish</label>
              <div className="flex gap-2 flex-wrap mt-2">
                {LANGUAGES.map(lang => (
                  !translationFields.includes(lang.value) && (
                    <Button
                      key={lang.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTranslation(lang.value)}
                    >
                      + {lang.label}
                    </Button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {holiday ? (
          <LoadingButton isLoading={isEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state || isCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
