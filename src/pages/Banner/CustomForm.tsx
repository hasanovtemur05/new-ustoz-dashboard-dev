import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { BannerInputType, Banner, BannerType, BannerLocationType } from 'modules/banner/types';
import { useEditBanner } from 'modules/banner/hooks/useEdit';
import { useCreateBanner } from 'modules/banner/hooks/useCreate';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { SelectType } from 'pages/Certificate/CustomForm';
import { cleanEmptyStrings } from 'utils/clearEmptyKeys';
import { bannerTypeData } from 'constants/banner';

interface IProps {
  banner?: Banner;
  setSheetOpen: (state: boolean) => void;
}

const locationData = [
  { type: BannerLocationType.HOME, name: 'Home' },
  { type: BannerLocationType.SHOP, name: "Do'kon" },
  { type: BannerLocationType.PORTFOLIO_LEADERBOARD, name: 'Portfolio Leaderboard' },
];



export default function CustomForm({ banner, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);

  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();
  const { triggerCreate } = useCreateBanner({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditBanner({
    id: banner?.id,
    setSheetOpen,
  });
  const { data: coursesList } = useCoursesList();

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: banner
      ? {
          title: banner?.title,
          content: banner?.content,
          photo: banner?.photo,
          type: banner?.type,
          location: banner?.location,
          link: banner?.link,
          objectId: banner?.objectId,
        }
      : {
          title: '',
          content: '',
          photo: '',
          type: '',
          location: '',
          link: '',
          objectId: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const values = await uploadFile<BannerInputType>(formValues, 'photo');
      const dataWithMobileImg = await uploadFile<BannerInputType>(values, 'mobilePhoto');
      const payload = cleanEmptyStrings(dataWithMobileImg);

      if (banner) {
        triggerEdit(payload);
      } else {
        triggerCreate(payload);
      }
    } catch (error) {
      setState(false);
      alert('Aniqlanmagan hatolik!');
    }
  }

  const type = form.watch('type');
  // console.log(form.setError(title,));

  useEffect(() => {
    if (type === BannerType.COURSE || banner?.type === BannerType.COURSE) {
      form.register('objectId', { required: 'Kursni tanlash talab qilinadi' });
    }
    if (type === BannerType.LINK || banner?.type === BannerType.LINK) {
      console.log('link');

      form.register('link', { required: 'Link kiritish talab qilinadi' });
    }
    if (type === BannerType.CONTENT || banner?.type === BannerType.CONTENT) {
      form.register('content', { required: 'Banner kontenti talab qilinadi' });
    }
  }, [type, form, banner]);

  useEffect(() => {
    let newArr: SelectType[] = [];
    coursesList.forEach((el) =>
      newArr.push({
        name: el.title,
        type: el.id,
      })
    );
    setCoursesData(newArr);
  }, [coursesList]);



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <SelectField name="location" data={locationData} placeholder="Locaton turini tanlang..." label="Locaton turini tanglang" />
          <FileField name="photo" label="Banner rasmi" />
          <SelectField name="type" data={bannerTypeData} placeholder="Banner turini tanlang..." label="Banner turini tanglang" />

          {(type === BannerType.COURSE || (banner && banner?.objectId)) &&
            (coursesData?.length ? (
              <SelectField name="objectId" key="objectId" data={coursesData} placeholder="Kursni  tanlang..." label="Kursni  tanglang" />
            ) : (
              'no courses'
            ))}

          {(type === BannerType.LINK || (banner && banner?.link)) && <TextField name="link" key="link" label="Banner linki" required />}

          <TextField name="title" key="title" label="Banner nomi" required />
          {type === BannerType.CONTENT && (
            <>
              <TextField name="content" key="content" label="Banner kontenti" required />
            </>
          )}
        </div>
        {banner ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
