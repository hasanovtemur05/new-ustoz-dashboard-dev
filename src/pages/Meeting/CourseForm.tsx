import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField, TextAreaField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useEditMeeting } from 'modules/meeting/hooks/useEdit';
import { useCreateMeeting } from 'modules/meeting/hooks/useCreate';
import { IMeeting, IMeetingInput, MeetingType } from 'modules/meeting/types';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import DateTimePicker from 'components/DateAndTimePicker';

const typeData = [
  { type: MeetingType.ONLINE, name: 'Online' },
  { type: MeetingType.OFFLINE, name: 'Offline' },
];

const courseSchema = z.object({
  title: z.string().min(6, { message: "Title eng kamida 6 ta harfdan iborat bo'lsin" }),
  description: z.string().min(20, {
    message: 'description uchun kamida 20 ta harifdan iforat text kirgazing',
  }),
  banner: z.union([
    z.custom<File>((file) => file instanceof File, {
      message: 'Rasm talab qilinadi',
    }),
    z.string(),
  ]),
  link: z.string({ message: 'Link kiritlishi shart' }),
  type: z.nativeEnum(MeetingType),
  startsAt: z.string({ message: 'boshlanish sanani kiritish shart' }),
});

type courseFormSchema = z.infer<typeof courseSchema>;

interface IProps {
  vacancy?: IMeeting;
  setSheetOpen: (state: boolean) => void;
}

export default function CourseForm({ vacancy, setSheetOpen }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { triggerVacancyCreate } = useCreateMeeting({ setSheetOpen });

  const { triggerMeetingEdit } = useEditMeeting({
    id: vacancy?.id,
    setSheetOpen,
  });
  const { uploadFile } = useFileUploader();

  const form = useForm<courseFormSchema>({
    resolver: zodResolver(courseSchema),
    mode: 'onSubmit',
    defaultValues: vacancy
      ? {
          title: vacancy.title,
          description: vacancy.description,
          banner: vacancy.banner,
          link: vacancy.link,
          type: vacancy.type,
          startsAt: vacancy.startsAt?.replace(':00.000Z', ''),
        }
      : {
          title: '',
          description: '',
          banner: '',
          link: '',
          type: MeetingType.EMPTY,
          startsAt: '',
        },
  });

  async function onSubmit(formValues: courseFormSchema) {
    setIsLoading(true);
    const payload = await uploadFile<IMeetingInput>(formValues, 'banner');
    if (vacancy) {
      triggerMeetingEdit(payload);
    } else {
      triggerVacancyCreate(payload);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Vebinar nomi" required placeholder="Vebinar nomi" />

          <TextField name="link" label="Uchrashuv linki(youtube)" placeholder="Link" required />

          <FileField name="banner" label="Uchrashuv rasmi" />

          <DateTimePicker name="startsAt" label="Uchrashuv boshlanish vaqtini kiriting" />

          <SelectField name="type" data={typeData} placeholder="Vebinar turi..." label="Vebinar turi" />

          <TextAreaField name="description" label="Vebinar tarifi " required placeholder="Vebinar tarifi" />
        </div>
        {vacancy ? (
          <LoadingButton isLoading={isLoading}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isLoading}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
