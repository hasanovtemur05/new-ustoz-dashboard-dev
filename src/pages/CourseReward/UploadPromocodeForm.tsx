import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import MediaUploadField from 'components/fields/VideoUploder';
import { useCreateCourseRewardPromocode } from 'modules/course-reward-promocode/hooks/useCreate';
import { z } from 'zod';

const schema = z.object({
  file: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: 'File talab qilinadi',
    }),
    z.string().min(2, { message: 'File talab qilinadi' }),
  ]),
});

type FormSchemaType = z.infer<typeof schema>;

interface IProps {
  rewardId: string;
  setSheetOpen: (state: boolean) => void;
}

export default function UploadPromocodeForm({ rewardId, setSheetOpen }: IProps) {
  const [loading, setLoading] = useState(false);
  const { triggerCreate } = useCreateCourseRewardPromocode({ setSheetOpen });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: '',
    },
  });

  async function onSubmit(values: FormSchemaType) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('rewardId', rewardId);

      await triggerCreate(formData);
    } catch (error) {
      console.error('Xato:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="my-4">
          <MediaUploadField name="file" label="Promocodlar file (Excel)" types={['XLS', 'XLSX', 'xls', 'xlsx']} />
        </div>
        <LoadingButton isLoading={loading}>Faylni yuklash</LoadingButton>
      </form>
    </Form>
  );
}
