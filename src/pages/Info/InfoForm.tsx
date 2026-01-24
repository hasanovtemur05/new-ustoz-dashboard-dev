import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField, TextAreaField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { InfoType, InfoInput } from 'modules/info/types';
import { useEditInfo } from 'modules/info/hooks/useEditInfo';
import { useCreateInfo } from 'modules/info/hooks/useCreateInfo';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import { bannerTypeData } from 'constants/banner';

const infoSchema = z.object({
  title: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
  url: z.string().min(3, { message: 'Malumot linki talab qilinadi' }),
  photo: z
    .union([
      z.custom<File>(file => file instanceof File, {
        message: 'Rasm talab qilinadi',
      }),
      z.string(),
    ])
    .optional(),
  course: z.string().min(3, { message: 'Kurs idisi talab qilinadi' }),
});

type notificationFormSchema = z.infer<typeof infoSchema>;

interface IProps {
  notification?: InfoType;
  setSheetOpen: (state: boolean) => void;
}
type CourseSelectType = { name: string, type: string }
export default function InfoForm({
  notification,
  setSheetOpen,
}: IProps) {

  const [coursesData, setCoursesData] = useState<CourseSelectType[]>([])
  const [state, setState] = useState(false)
  const { uploadFile } = useFileUploader();
  const { triggerInfoCreate } =
    useCreateInfo({ setSheetOpen });
  const { triggerInfoEdit, isPending: isNotificationEditPending } = useEditInfo({
    id: notification?.id,
    setSheetOpen,
  });

  // get courses 
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();

  const form = useForm<notificationFormSchema>({
    resolver: zodResolver(infoSchema),
    defaultValues: notification
      ? {
        title: notification?.title,
        url: notification?.url,
        photo: notification?.photo,
        course: notification?.course
        // photo: notification.photo,
        // type: notification.type,
      }
      : {
        title: '',
        url: '',
      },
  });

  async function onSubmit(formValues: notificationFormSchema) {
    setState(true)
    const values = await uploadFile<InfoInput>(formValues, 'photo');
    if (notification) {
      triggerInfoEdit(values);
    } else {
      triggerInfoCreate(values);
    }
  }

  useEffect(() => {
    let newArr: CourseSelectType[] = [{
      name: "All",
      type: "all"
    }]
    coursesList.forEach(el => newArr.push({
      name: el.title, type: el.id,
    }))
    setCoursesData(newArr)
  }, [coursesList])


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Malumot nomi" required />
          <TextField name="url" label="Malumot linki" required />
          {/* <TextAreaField name="url" label="Bildirishnoma matni" required /> */}
          <FileField name="photo" label="Malumot rasmi" />

          {
            loadingCourses && !notification ? (<SelectField
              name="courseId"
              data={bannerTypeData}
              placeholder="Kurslar hali yuklanmagan..."
              label="Kurslar hali yuklanmagan"
            />) : (<SelectField
              name="course"
              data={coursesData}
              placeholder="Kursni tanlang..."
              label="Kursni tanglang"
            />)
          }
        </div>
        {notification ? (
          <LoadingButton isLoading={isNotificationEditPending}>
            Tahrirlash
          </LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>
            Saqlash
          </LoadingButton>
        )}
      </form>
    </Form>
  );
}
