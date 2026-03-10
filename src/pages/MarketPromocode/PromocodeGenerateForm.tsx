import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { generateSchema, useGenerateSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import SelectField from 'components/fields/Select';
import http from 'services/api';

interface IProps {
  setSheetOpen: (state: boolean) => void;
}

const discountTypeOptions = [
  { type: 'PERCENT', name: 'Foiz (%)' },
  { type: 'FIXED', name: 'Sobit summa' },
];

export default function PromocodeGenerateForm({ setSheetOpen }: IProps) {
  const [state, setState] = useState(false);

  const form = useForm<useGenerateSchemaType>({
    resolver: zodResolver(generateSchema),
  });

  async function onSubmit(formValues: useGenerateSchemaType) {
    setState(true);
    try {
      const response = await http.post(`/promocode/generate`, formValues, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `promocodes-${formValues.number}.xlsx`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSheetOpen(false);
    } catch (error) {
      alert('Aniqlanmagan xatolik yuz berdi!');
    } finally {
      setState(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <NumberTextField
            name="number"
            placeholder="50"
            label="Nechta promokod yaratmoqchisiz"
          />
          <SelectField
            name="discountType"
            key="discountType"
            data={discountTypeOptions}
            placeholder="Chegirma turini tanlang..."
            label="Chegirma turini tanlang"
          />
          <NumberTextField
            name="discountValue"
            placeholder="10"
            label="Chegirma qiymati"
          />
        </div>
        <LoadingButton isLoading={state}>Yaratish</LoadingButton>
      </form>
    </Form>
  );
}