import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField, TextField, TextAreaField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import NumberTextField from 'components/fields/Number';
import KeywordField from 'components/fields/KeywordField';
import { Vacancy, VacancyType } from 'modules/vacancy/types';
import { useCreateVacancy } from 'modules/vacancy/hooks/useCreateCourse';
import { useEditVacancy } from 'modules/vacancy/hooks/useEditCourse';
import { vacancyFormSchema, vacancySchema } from './schema';

const workScheduleData = [
  { type: 'FULL_TIME', name: "To'liq kun" },
  { type: 'PART_TIME', name: 'Yarim stavka' },
  { type: 'REMOTE', name: 'Masofaviy' },
];

const experienceData = [
  { type: 'NO_EXPERIENCE', name: 'Tajriba shart emas' },
  { type: 'ONE_TO_THREE_YEARS', name: '1 yildan 3 yilgacha' },
  { type: 'THREE_TO_SIX_YEARS', name: '3 yildan 6 yilgacha' },
  { type: 'SIX_PLUS_YEARS', name: "6 yildan ko'p" },
];

const vacancyTypeData = [
  { type: 'INTERN', name: 'Amalyot' },
  { type: 'EMPLOYEE', name: 'Xodim' },
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
          address: vacancy?.address?.region || '', // Simple fallback for now
          description: vacancy?.description,
          company: vacancy?.company,
          salaryFrom: vacancy?.salaryFrom,
          salaryTo: vacancy?.salaryTo,
          type: vacancy?.type,
          workSchedule: vacancy?.workSchedule,
          experience: vacancy?.experience,
          skills: vacancy?.skills,
          specialization: vacancy?.specialization || '',
        }
      : {
          title: '',
          address: '',
          description: '',
          company: '',
          salaryFrom: 0,
          salaryTo: 0,
          type: 'EMPLOYEE',
          workSchedule: 'FULL_TIME',
          experience: 'NO_EXPERIENCE',
          specialization: '',
        },
  });

  async function onSubmit(formValues: vacancyFormSchema) {
    const { salaryFrom, salaryTo, skills, specialization } = formValues;

    const payload = {
      ...formValues,
      salaryFrom: +salaryFrom,
      salaryTo: +salaryTo,
      skills: skills.map((skill) => (typeof skill === 'string' ? skill : skill.title)),
      specialization: specialization,
    };

    if (vacancy) {
      triggerVacancyEdit(payload);
    } else {
      triggerVacancyCreate(payload);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Vakansiya nomi" required placeholder="Frontendchi kerak" />

          <TextField name="company" label="Kompaniya nomi" placeholder="Google" required />

          <TextField name="specialization" label="Mutaxassislik" placeholder="Frontend Developer" required />

          <TextField name="address" label="Manzil" required placeholder="Samarqand" />

          <div className="grid grid-cols-2 gap-4">
             <SelectField name="type" data={vacancyTypeData} placeholder="Turi..." label="Vakansiya turi" />
             <SelectField name="workSchedule" data={workScheduleData} placeholder="Ish vaqti..." label="Ish vaqti" />
          </div>

          <SelectField name="experience" data={experienceData} placeholder="Tajriba..." label="Talab etiladigan tajriba" />

          <div className="grid grid-cols-2 gap-4">
            <NumberTextField name="salaryFrom" placeholder="Dan" label="Oylik (dan)" required />
            <NumberTextField name="salaryTo" placeholder="Gacha" label="Oylik (gacha)" required />
          </div>

          <TextAreaField name="description" label="Vakansiya Tarifi " required />
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
