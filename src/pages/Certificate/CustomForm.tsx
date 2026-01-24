import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import { CertificateType, RecommendationType, RecEnum, CertificateInputType } from 'modules/certificate/types';
import { useEditRow } from 'modules/certificate/hooks/useEdit';
import { useCreateCertificate } from 'modules/certificate/hooks/useCreate';
import { schema, recSchema, useFormSchemaType } from './schema';

interface IProps {
  certificate?: CertificateType | RecommendationType;
  setSheetOpen: (state: boolean) => void;
}

const degreeData = [
  { type: "GOLD", name: "Oltin" },
  { type: "SILVER", name: "Kumush" },
  { type: "BRONZE", name: "Bronza" }
];

const recommendationData = [
  { type: RecEnum.AMATEUR, name: "Havaskor" },
  { type: RecEnum.PROGRESSIVE, name: "Progressive" }
];

export type SelectType = { name: string; type: string; disabled?: boolean };

export default function CustomForm({ certificate, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();
  const { triggerCreate } = useCreateCertificate({ setSheetOpen });

  const isRecommendation = certificate && 'type' in certificate;

  // Hooks: useEditRow
  const { triggerEdit, isPending: isEditPending } = useEditRow({
    id: certificate?.id || '',
    setSheetOpen,
    type: isRecommendation ? 'recommendation' : 'certificate',
  });

  // Courses list
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();

  const form = useForm<useFormSchemaType>({
  resolver: zodResolver(isRecommendation ? recSchema : schema),
  defaultValues: certificate
    ? isRecommendation
      ? {
          type: certificate.type as RecEnum, // <- bu muammoni hal qiladi
          photo: certificate.photo,
          courseId: certificate.course.id,
        }
      : {
          degree: certificate.degree,
          photo: certificate.photo,
          courseId: certificate.course?.id,
        }
    : { degree: '', type: undefined, photo: '', courseId: '' },
});


  async function onSubmit(formValues: useFormSchemaType) {
    try {
      setState(true);
      const values = await uploadFile<CertificateInputType>(formValues, 'photo');
      if (certificate) {
        triggerEdit(values);
      } else {
        triggerCreate(values);
      }
    } catch (error) {
      setState(false);
      alert("Aniqlanmagan hatolik!");
    }
  }

  useEffect(() => {
    let newArr: SelectType[] = [{ name: "All", type: "all" }];
    coursesList.forEach(el => newArr.push({ name: el.title, type: el.id }));
    setCoursesData(newArr);
  }, [coursesList]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <FileField name="photo" label="Malumot rasmi" />

          {isRecommendation ? (
            <SelectField
              name="type"
              data={recommendationData}
              placeholder="Type tanlang..."
              label="Type"
            />
          ) : (
            <SelectField
              name="degree"
              data={degreeData}
              placeholder="Darajani tanlang..."
              label="Daraja"
            />
          )}

          {loadingCourses && !certificate ? (
            <SelectField
              name="courseId"
              data={[{ name: "Loading...", type: "loading" }]}
              placeholder="Kurslar yuklanmoqda..."
              label="Kurslar"
            />
          ) : (
            <SelectField
              name="courseId"
              data={coursesData}
              placeholder="Kursni tanlang..."
              label="Kursni tanlang"
            />
          )}
        </div>

        <LoadingButton isLoading={certificate ? isEditPending : state}>
          {certificate ? "Tahrirlash" : "Saqlash"}
        </LoadingButton>
      </form>
    </Form>
  );
}
