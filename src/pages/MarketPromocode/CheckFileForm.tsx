import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { checkFileSchema, useCheckFileSchemaType } from './schema';
import MediaUploadField from 'components/fields/VideoUploder';
import http from 'services/api';

interface IProps {
  setSheetOpen: (state: boolean) => void;
}

export default function CheckFileForm({ setSheetOpen }: IProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<useCheckFileSchemaType>({
    resolver: zodResolver(checkFileSchema),
  });

  async function onSubmit(values: useCheckFileSchemaType) {
    setLoading(true);
    try {
      console.log('Form values:', values);
      const formData = new FormData();
      formData.append('file', values.file);

      const res = await http.post('/promocode/check', formData, {
        responseType: 'blob',
      });

      // Content-Disposition sarlavhasidan fayl nomini olish
      const contentDisposition = res.headers['content-disposition'];
      let fileName = `promocode_check_${new Date().toISOString()}.xlsx`; // Default nom
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }
      }

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Fayl yuklab olindi:', fileName);
    } catch (error) {
      console.error('Xato:', error);
      alert('Aniqlanmagan xatolik!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="my-4">
          <MediaUploadField name="file" label="Promocodlar file(exel)" types={['XLS', 'XLSX']} />
        </div>
        <LoadingButton isLoading={loading}>Tekshirish</LoadingButton>
      </form>
    </Form>
  );
}
