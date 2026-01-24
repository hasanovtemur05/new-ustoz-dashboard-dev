import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { RichTextEditor, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import NumberTextField from 'components/fields/Number';
import KeywordField from 'components/fields/KeywordField';
import { Vacancy, VacancyType } from 'modules/vacancy/types';
import { useCreateVacancy } from 'modules/vacancy/hooks/useCreateCourse';
import { useEditVacancy } from 'modules/vacancy/hooks/useEditCourse';
import { vacancyFormSchema, vacancySchema } from './schema';

const typeData = [
  { type: VacancyType.FULL_TIME, name: "To'liq vaqt" },
  { type: VacancyType.ONE_TIME, name: 'Bir martalik' },
  { type: VacancyType.INTERN, name: 'Amalyot' },
];

interface IProps {
  vacancy?: Vacancy;
  setSheetOpen: (state: boolean) => void;
}

export default function CourseForm({ vacancy, setSheetOpen }: IProps) {
  const { triggerVacancyCreate, isPending: isCourseCreatePending } = useCreateVacancy({ setSheetOpen });
  const { triggerVacancyEdit, isPending: isCourseEditPending } = useEditVacancy({
    id: vacancy?.id,
    setSheetOpen,
  });

  const form = useForm<vacancyFormSchema>({
    resolver: zodResolver(vacancySchema),
    mode: 'onSubmit',
    defaultValues: vacancy
      ? {
          title: vacancy?.title,
          address: vacancy?.address,
          description: vacancy?.description,
          company: vacancy?.company,
          // address: vacancy?.address,
          salary: vacancy?.salary,
          type: vacancy?.type,
          fromExperience: vacancy?.fromExperience,
          toExperience: vacancy?.toExperience,
          skills: vacancy?.skills,
        }
      : {
          title: '',
          address: '',
          description: '',
          company: '',
          salary: 0,
          type: VacancyType.EMPTY,
          fromExperience: 0,
          toExperience: 0,
          // skills: ,
        },
  });

  async function onSubmit(formValues: vacancyFormSchema) {
    const { fromExperience, toExperience, salary, skills } = formValues;

    if (vacancy) {
      const normalizedSkills = skills.map((skill) => (typeof skill === 'string' ? skill : skill.title));
      triggerVacancyEdit({
        ...formValues,
        fromExperience: +fromExperience,
        toExperience: +toExperience,
        salary: +salary,
        skills: normalizedSkills,
      });
    } else {
      triggerVacancyCreate({
        ...formValues,
        fromExperience: +fromExperience,
        toExperience: +toExperience,
        salary: +salary,
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Vakansiya nomi" required placeholder="Frontendchi kerak" />

          <TextField name="company" label="Kompaniya nomi" placeholder="Google" required />

          <TextField name="address" label="Manzil" required placeholder="Toshkent , Uzbekistan" />

          <SelectField name="type" data={typeData} placeholder="Vakansiya turi..." label="Vakansiya turi" />

          <NumberTextField name="salary" placeholder="Oylik maosh" label="Oylik maosh" required />

          <div>
            <h2 className="font-medium">Talab etadigan tajriba</h2>
            <div className="flex items-end gap-2">
              <NumberTextField name={'fromExperience'} label="Boshlang'ich" required />
              <NumberTextField name={'toExperience'} label="Maximal" required />
            </div>
          </div>

          <RichTextEditor name="description" label="Vakansiya Tarifi " required />
          <KeywordField name="skills" label="Talab qilinadigan skillar" placeholder="React.js" required />
        </div>
        {vacancy ? (
          <LoadingButton isLoading={isCourseEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isCourseCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
