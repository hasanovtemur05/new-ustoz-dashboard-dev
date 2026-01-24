import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { News, NewsInput } from 'modules/news/types';
import useFileUploader from 'hooks/useFileUploader';
import { useCreateNews } from 'modules/news/hooks/useCreateNews';
import { useEditNews } from 'modules/news/hooks/useEditNews';
import { useCreateNotification } from 'modules/notifications/hooks/useCreateNotification';
import { Form } from 'components/ui/form';
import { FileField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { RichTextEditor } from 'components/fields';

const newsSchema = z.object({
  title: z.string().min(3, { message: 'Yanglik nomi talab qilinadi' }),
  content: z.string().min(3, { message: 'Tavsif talab qilinadi' }),

  photo: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: 'Rasm talab qilinadi',
    }),
    z.string().min(1, { message: 'Rasm talab qilinadi' }),
  ]),
});

type newsFormSchema = z.infer<typeof newsSchema>;

interface IProps {
  news?: News;
  setSheetOpen: (state: boolean) => void;
}

export default function NewsForm({ news, setSheetOpen }: IProps) {
  const [loading, setLoding] = useState(false);

  const { uploadFile } = useFileUploader();
  const { triggerNewsCreate } = useCreateNews(setSheetOpen);
  const { triggerNewsEdit } = useEditNews({
    id: news?.id,
    setSheetOpen,
  });

  const form = useForm<newsFormSchema>({
    resolver: zodResolver(newsSchema),
    defaultValues: news
      ? {
          title: news.title,
          content: news.content,
          photo: news.photo,
        }
      : {
          title: '',
          content: '',
          photo: undefined,
        },
  });

  async function onSubmit(formValues: newsFormSchema) {
    setLoding(true);
    const values = await uploadFile<NewsInput>(formValues, 'photo');

    if (news) {
      triggerNewsEdit(values);
    } else {
      await triggerNewsCreate(values);
    }
    setLoding(false);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex gap-4 flex-col my-4">
            <TextField name="title" label="Yangilik nomi" required />

            <RichTextEditor name="content" label="Yangilik tavsifi" required />
            <FileField name="photo" label="Yangilik rasmi" required />
          </div>
          {news ? <LoadingButton isLoading={loading}>Tahrirlash</LoadingButton> : <LoadingButton isLoading={loading}>Saqlash</LoadingButton>}
        </form>
      </Form>
    </>
  );
}
