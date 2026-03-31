import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import {
  CreateRecommendationCertificateType,
  RecEnum
} from 'modules/certificate/types';
import { useCreateRecommendationCertificate } from 'modules/certificate/hooks/useCreate';
import { RecFormType, recSchema } from './schema';


interface IProps {
  setSheetOpen: (state: boolean) => void;
}

const recTypeData = [
  { type: RecEnum.AMATEUR, name: "Havaskor" },
  { type: RecEnum.PROGRESSIVE, name: "Rivojlanayotgan" },
];

export type SelectType = { name: string; type: string };

export default function RecommendationCertificateForm({ setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);

  const { uploadFile } = useFileUploader();
  const { recTriggerCreate } = useCreateRecommendationCertificate({ setSheetOpen });
  const { data: coursesList } = useCoursesList();

  // ---------------- Form ----------------
  const form = useForm<RecFormType>({
    resolver: zodResolver(recSchema),
    defaultValues: {
      type: undefined,
      photo: '',
      courseId: '',
    },
  });

  // ---------------- Submit ----------------
  async function onSubmit(formValues: RecFormType) {
    try {
      setState(true);

      const values = await uploadFile<CreateRecommendationCertificateType>(
        formValues,
        'photo'
      );

      recTriggerCreate(values);

    } catch (error) {
      setState(false);
      alert('Aniqlanmagan hatolik!');
    }
  }

  // ------------- Courses Select -------------
  useEffect(() => {
    let newArr: SelectType[] = [];

    coursesList?.forEach((el) =>
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
          
          <FileField name="photo" label="Rasm yuklash" />

          <SelectField
            name="type"
            data={recTypeData}
            placeholder="Sertifikat turini tanlang..."
            label="Sertifikat turi"
          />

          <SelectField
            name="courseId"
            data={coursesData}
            placeholder="Kursni tanlang..."
            label="Kurs"
          />
        </div>

        <LoadingButton isLoading={state}>Saqlash</LoadingButton>
      </form>
    </Form>
  );
}
