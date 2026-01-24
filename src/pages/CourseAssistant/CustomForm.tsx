import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { bannerTypeData } from 'constants/banner';
import { useEditCourseAssistant } from 'modules/course-assistant/hooks/useEdit';
import { useCreateCourseAssistant } from 'modules/course-assistant/hooks/useCreate';
import { ICourseAssistant, ICourseAssistantInput } from 'modules/course-assistant/types';
import VideoUploadField from 'components/fields/VideoUploder';

interface IProps {
  selectedData?: ICourseAssistant;
  setSheetOpen: (state: boolean) => void;
}

export type SelectType = { name: string; type: string; disabled?: boolean };
export default function CustomForm({ selectedData, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();
  const { triggerCreate } = useCreateCourseAssistant({ setSheetOpen });
  const { triggerEdit } = useEditCourseAssistant({
    id: selectedData?.id,
    setSheetOpen,
  });

  // get courses
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: selectedData
      ? {
          courseId: selectedData?.courseId,
          assistantId: selectedData?.assistantId,
          staticAnimation: selectedData?.staticAnimation,
          thinkingAnimation: selectedData?.thinkingAnimation,
        }
      : {
          courseId: '',
          assistantId: '',
          staticAnimation: '',
          thinkingAnimation: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const staticAnimation = await uploadFile<ICourseAssistantInput>(formValues, 'staticAnimation');
      const payload = await uploadFile<ICourseAssistantInput>(staticAnimation, 'thinkingAnimation');
      if (selectedData) {
        triggerEdit(payload);
      } else {
        triggerCreate(payload);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setState(false);
    }
  }

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
          {loadingCourses && !selectedData ? (
            <SelectField name="courseId" data={bannerTypeData} placeholder="Kurslar hali yuklanmagan..." label="Kurslar hali yuklanmagan" />
          ) : (
            <SelectField name="courseId" data={coursesData} placeholder="Kursni tanlang..." label="Kursni tanglang" />
          )}

          <TextField name="assistantId" label="Assistant Id" required placeholder="Assistant Id" />

          <VideoUploadField
            name="staticAnimation"
            label="Oddiy holatdagi gif"
            defaultValue={selectedData?.staticAnimation}
            types={['JPG', 'PNG', 'GIF']}
          />
          <VideoUploadField
            name="thinkingAnimation"
            label="O'ylangan holatdagi gif"
            defaultValue={selectedData?.thinkingAnimation}
            types={['JPG', 'PNG', 'GIF']}
          />
        </div>
        {selectedData ? <LoadingButton isLoading={state}>Tahrirlash</LoadingButton> : <LoadingButton isLoading={state}>Saqlash</LoadingButton>}
      </form>
    </Form>
  );
}
