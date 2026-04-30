import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import VideoUploadField from 'components/fields/VideoUploder';
import { imageTypes } from 'constants/file';
import { schema, useFormSchemaType } from './schema';
import { BannerPhoto } from 'modules/banner-photo/types';
import { useCreateBannerPhoto } from 'modules/banner-photo/hooks/useCreate';
import { useEditBannerPhoto } from 'modules/banner-photo/hooks/useEdit';

interface IProps {
  banner?: BannerPhoto;
  setSheetOpen: (state: boolean) => void;
  whereIs: string;
}

export default function CustomForm({ banner, setSheetOpen, whereIs }: IProps) {
  const { triggerCreate, isPending: isCreatePending } = useCreateBannerPhoto({ setSheetOpen });
  const { triggerEdit, isPending: isEditPending } = useEditBannerPhoto({ 
    id: banner?.id!, 
    setSheetOpen 
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: banner?.title || '',
      whereIs: banner?.whereIs || whereIs || '',
      photo: banner?.photo as any,
    },
  });

  async function onSubmit(values: useFormSchemaType) {
    if (banner) {
      triggerEdit(values);
    } else {
      triggerCreate(values as any);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField name="title" label="Sarlavha" required />
        <TextField name="whereIs" label="Joylashuv (whereIs)" required />
        <VideoUploadField
          name="photo"
          label="Banner rasmi"
          types={imageTypes}
          defaultValue={banner?.photo}
          required
        />
        <LoadingButton isLoading={isCreatePending || isEditPending}>Saqlash</LoadingButton>
      </form>
    </FormProvider>
  );
}
