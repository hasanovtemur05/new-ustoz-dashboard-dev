import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Notification, NotificationInput } from 'modules/notifications/types';

import { useCreateNotification } from 'modules/notifications/hooks/useCreateNotification';
import { useEditNotification } from 'modules/notifications/hooks/useEditNotification';
import { Form } from 'components/ui/form';
import { FileField, TextField, RichTextEditor, TextAreaField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { BannerType } from 'modules/banner/types';
import { bannerTypeData } from 'constants/banner';
import { SelectType } from 'pages/Certificate/CustomForm';
import { useEffect, useState } from 'react';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';

const notificationSchema = z.object({
  title: z.string().min(3, { message: 'Bilidirishnoma nomi talab qilinadi' }),
  content: z.string().min(3, { message: 'Bilidirishnoma matni talab qilinadi' }),
  body: z.string().min(3, { message: 'Bilidirishnoma matni talab qilinadi' }),
  photo: z
    .union([
      z.custom<File>((file) => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string(),
    ])
    .optional(),
  type: z.nativeEnum(BannerType),
  objectId: z.string().optional(),
  link: z.string().optional(),
});

type notificationFormSchema = z.infer<typeof notificationSchema>;

interface IProps {
  notification?: Notification;
  setSheetOpen: (state: boolean) => void;
}

export default function NotificationForm({ notification, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  // console.log(notification, "notificationvvvvvvvvvvvvv");
  

  const { uploadFile } = useFileUploader();
  const { triggerNotificationCreate, isPending: isNotificationCreatePending } = useCreateNotification({ setSheetOpen });
  const { triggerNotificationEdit, isPending: isNotificationEditPending } = useEditNotification({
    id: notification?.id,
    setSheetOpen,
  });
  const { data: coursesList } = useCoursesList();

  const form = useForm<notificationFormSchema>({
    resolver: zodResolver(notificationSchema),
    defaultValues: notification
      ? {
          title: notification.title,
          content: notification.content,
          photo: notification.photo,
          body: notification.body,
          type: notification.type,
        }
      : {
          title: '',
          content: '',
          body: '',
          photo: undefined,
          type: BannerType.NONE,
        },
  });

  const type = form.watch('type');

  async function onSubmit(formValues: notificationFormSchema) {
    const values = await uploadFile<NotificationInput>(formValues, 'photo');

    if (notification) {
      triggerNotificationEdit(values);
    } else {
      triggerNotificationCreate(values);
    }
  }

  useEffect(() => {
    if (type === BannerType.COURSE || notification?.type === BannerType.COURSE) {
      form.register('objectId', { required: 'Kursni tanlash talab qilinadi' });
    }
    if (type === BannerType.LINK || notification?.type === BannerType.LINK) {
      form.register('link', { required: 'Link kiritish talab qilinadi' });
    }
  }, [type, form, notification]);

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
          <TextField name="title" label="Bildirishnoma nomi" required />
          <TextAreaField name="body" label="Bildirishnoma matni" required />
          <RichTextEditor name="content" label="Bildirishnoma kontenti(batavsil)" required />
          <FileField name="photo" label="Bildirishnoma rasmi" />

          <SelectField name="type" data={bannerTypeData} placeholder="Notification turini tanlang..." label="Notification turini tanlang" />

          {(type === BannerType.COURSE || (notification && notification?.objectId)) &&
            (coursesData?.length ? (
              <SelectField name="objectId" key="objectId" data={coursesData} placeholder="Kursni  tanlang..." label="Kursni  tanglang" />
            ) : (
              'no courses'
            ))}

          {(type === BannerType.LINK || (notification && notification?.link)) && (
            <TextField name="link" key="link" label="Notification linki" required />
          )}
        </div>
        {notification ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isNotificationCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
