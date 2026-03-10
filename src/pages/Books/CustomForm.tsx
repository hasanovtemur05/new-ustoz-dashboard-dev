import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import { useCreateBook } from 'modules/books/hooks/useCreateBook';
import { useEditBook } from 'modules/books/hooks/useEditBook';
import { Book, BookInput } from 'modules/books/types';
import { schema, UseFormSchemaType } from './schema';

interface IProps {
  book?: Book;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ book, setSheetOpen }: IProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useFileUploader();

  const { triggerBookCreate, isPending: isCreatePending } = useCreateBook({ setSheetOpen });
  const { triggerBookEdit, isPending: isEditPending } = useEditBook({
    id: book?.id,
    setSheetOpen,
  });

  const form = useForm<UseFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: book
      ? {
          name: book.name,
          photo: book.photo,
          file: book.file,
          pagesCount: book.pagesCount,
          description: book.description,
        }
      : {
          name: '',
          photo: '',
          file: '',
          pagesCount: undefined,
          description: '',
        },
  });

  async function onSubmit(formValues: UseFormSchemaType) {
    setIsUploading(true);
    try {
      // photo faylini yuklash
      const withPhoto = await uploadFile<UseFormSchemaType>(formValues, 'photo');
      console.log(withPhoto , "photo");
     
      
      // file faylini yuklash
      const withFile = await uploadFile<typeof withPhoto>(withPhoto, 'file');
        console.log(withFile , "file");

      const payload: BookInput = {
        name: withFile.name,
        photo: withFile.photo as string,
        file: withFile.file as string,
        pagesCount: withFile.pagesCount,
        description: withFile.description || '',
      };

      if (book) {
        triggerBookEdit(payload);
      } else {
        await triggerBookCreate(payload);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setIsUploading(false);
    }
  }

  const isPending = isCreatePending || isEditPending || isUploading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Rasm */}
        <FileField name="photo" label="Kitob rasmi" />

        {/* PDF fayl */}
        <FileField name="file" label="Kitob fayli (PDF)" isFileUpload />

        {/* Kitob nomi */}
        <TextField name="name" label="Kitob nomi" placeholder="Kitob nomini kiriting" />

        {/* Sahifalar soni */}
        <TextField
          name="pagesCount"
          label="Sahifalar soni"
          placeholder="Masalan: 320"
          // type="number"
        />

        {/* Tavsif */}
        <TextField
          name="description"
          label="Kitob haqida"
          placeholder="Kitob tavsifini kiriting"
        />

        <LoadingButton isLoading={isPending}>
          {book ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}