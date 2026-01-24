import { useEffect, useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import DateTimePicker from 'components/DateAndTimePicker';
import { Button } from 'components/ui/button';
import { BannerType } from 'modules/banner/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { SelectType } from 'pages/Certificate/CustomForm';
import { cleanEmptyStrings } from 'utils/clearEmptyKeys';
import { StoryV2Type, MediaType, IStoryMedia } from 'modules/story-v2/types';
import { useCreateStory } from 'modules/story-v2/hooks/useCreate';
import { useEditStory } from 'modules/story-v2/hooks/useEdit';
import { imageTypes, videoTypes } from 'constants/file';
import { schema, useFormSchemaType } from './schema';
import VideoUploadField from 'components/fields/VideoUploder';
// SelectField uchun ma'lumotlar
const typeData = [
    { type: BannerType.COURSE, name: 'Kurslar' },
    { type: BannerType.LEADERBOARD, name: 'Peshqadamlar' },
    { type: BannerType.SHOP, name: "Do'kon" },
    { type: BannerType.LINK, name: 'Havola' },
    { type: BannerType.REFERRAL, name: 'Referral' },
    { type: BannerType.VACANCY, name: 'Vacancy' },
    { type: BannerType.PREMIUM, name: 'Premium' },
    { type: BannerType.VEBINAR, name: 'Vebinar' },
    { type: BannerType.NONE, name: 'None' },
];

interface IProps {
  story?: StoryV2Type;
  setSheetOpen: (state: boolean) => void;
}

const initialMediaData = [
  {
    mediaType: MediaType.IMAGE,
    mediaUrl: '',
    sortId: 1,
    title: '',
    button: '',
    link: '',
    type: '',
    deadline: '',
    objectId: '',
  },
];
export default function CustomForm({ story, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();
  const { triggerCreate, isPending: isInfoCreatePending } = useCreateStory({ setSheetOpen });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditStory({
    id: story?.id,
    setSheetOpen,
  });
  const { data: coursesList } = useCoursesList();

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: story
      ? {
          title: story?.title,
          thumbnailUrl: story?.thumbnailUrl,
          media: story?.media || initialMediaData,
        }
      : {
          title: '',
          thumbnailUrl: '',
          media: initialMediaData,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'media',
  });

  // Kurslar ro'yxatini tayyorlash
  useEffect(() => {
    const newArr: SelectType[] = coursesList.map((el) => ({
      name: el.title,
      type: el.id,
    }));
    setCoursesData(newArr);
  }, [coursesList]);

  // Yangi media qo'shish
  const addNewMedia = () => {
    append({
      mediaType: MediaType.IMAGE,
      mediaUrl: '',
      title: '',
      button: '',
      link: '',
      type: '',
      deadline: '',
      objectId: '',
    });
  };

  // Formani yuborish
  async function onSubmit(formValues: useFormSchemaType) {
    try {
      setState(true);
      const valuesWithImg = await uploadFile<StoryV2Type>(formValues, 'thumbnailUrl');

      const formattedMedia = await Promise.all(
        formValues.media.map(async (media, index) => {
          let uploadedMediaUrl = media.mediaUrl;
          if (media.mediaUrl instanceof File) {
            const values = await uploadFile<IStoryMedia>(media, 'mediaUrl');
            uploadedMediaUrl = values.mediaUrl;
          }
          return cleanEmptyStrings({
            ...media,
            mediaUrl: uploadedMediaUrl,
            deadline: media.deadline.includes('00.000Z') ? media.deadline : media.deadline + ':00Z',
            sortId: index,
          });
        })
      );

      const formattedValues = {
        ...valuesWithImg,
        media: formattedMedia,
      };

      const payload = cleanEmptyStrings(formattedValues);

      if (story) {
        triggerEdit(payload);
      } else {
        triggerCreate(payload);
      }
      setState(false);
    } catch (error) {
      setState(false);
      alert('Aniqlanmagan xatolik!');
    }
  }


  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField name="title" label="Hikoya nomi" required />
        <VideoUploadField
          name="thumbnailUrl"
          label="Hikoya rasmi"
          types={imageTypes}
          defaultValue={typeof story?.thumbnailUrl === 'string' ? story?.thumbnailUrl : ''}
        />

        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md relative">
              <h3 className="text-lg font-semibold">Media {index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-500"
                disabled={fields.length === 1}
              >
                O'chirish
              </button>

              <SelectField
                name={`media.${index}.mediaType`}
                data={[
                  { name: 'Rasm', type: MediaType.IMAGE },
                  { name: 'Video', type: MediaType.VIDEO },
                ]}
                placeholder="Media turini tanlang..."
                label="Media turi"
              />

              <VideoUploadField
                name={`media.${index}.mediaUrl`}
                label={form.watch(`media.${index}.mediaType`) === MediaType.IMAGE ? 'Hikoya rasmi' : 'Hikoya videosi'}
                types={form.watch(`media.${index}.mediaType`) === MediaType.IMAGE ? imageTypes : videoTypes}
                defaultValue={typeof field.mediaUrl === 'string' ? field.mediaUrl : ''}
              />

              <TextField name={`media.${index}.title`} label="Media sarlavhasi" required placeholder="Sarlavha kiriting" />
              <TextField name={`media.${index}.button`} label="Tugma matni" required placeholder="Boshlash, Ko'rish" />
              <DateTimePicker name={`media.${index}.deadline`} label="Hikoyani tugash vaqtini kiriting" />
              <SelectField name={`media.${index}.type`} data={typeData} placeholder="Hikoya turini tanlang..." label="Hikoya turini tanlang" />

              {form.watch(`media.${index}.type`) === BannerType.COURSE &&
                (coursesData?.length ? (
                  <SelectField name={`media.${index}.objectId`} data={coursesData} placeholder="Kursni tanlang..." label="Kursni tanlang" />
                ) : (
                  <p className="text-red-500">Kurslar yuklanishda xatolik!</p>
                ))}

              {form.watch(`media.${index}.type`) === BannerType.LINK && (
                <TextField name={`media.${index}.link`} label="Hikoya linki" required={form.watch(`media.${index}.type`) === BannerType.LINK} />
              )}
            </div>
          ))}
        </div>

        <Button type="button" onClick={addNewMedia} className="mt-4">
          + Yangi Media Qo'shish
        </Button>

        {story ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state || isInfoCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </FormProvider>
  );
}
