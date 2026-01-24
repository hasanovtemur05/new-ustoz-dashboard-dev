import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import NumberTextField from 'components/fields/Number';

import { DiscountEnum, IPromocode } from 'modules/promocode/types';
import { useCreatePromocode } from 'modules/promocode/hooks/useCreate';
import { useEditPromocode } from 'modules/promocode/hooks/useEdit';
import DateTimePicker from 'components/DateAndTimePicker';

const typeData = [
  { type: DiscountEnum.FIXED, name: 'Pul miqdorida' },
  { type: DiscountEnum.PERCENT, name: 'Foiz hisobida' },
];

const courseSchema = z.object({
  code: z.string().min(3, { message: "Promocode  kamida 3 ta harfdan iborat bo'lsin" }),
  discountValue: z.union([z.number(), z.string()]),
  discountType: z.nativeEnum(DiscountEnum),
  maxUses: z.union([z.number(), z.string()]).optional(),
  minOrderValue: z.union([z.number(), z.string()]),
  userLimit: z.union([z.number(), z.string()]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type courseFormSchema = z.infer<typeof courseSchema>;

interface IProps {
  promocode?: IPromocode;
  setSheetOpen: (state: boolean) => void;
}

export default function CourseForm({ promocode, setSheetOpen }: IProps) {
  const { triggerVacancyCreate, isPending: isCourseCreatePending } = useCreatePromocode({ setSheetOpen });
  const { triggerVacancyEdit, isPending: isCourseEditPending } = useEditPromocode({
    id: promocode?.id,
    setSheetOpen,
  });

  const form = useForm<courseFormSchema>({
    resolver: zodResolver(courseSchema),
    mode: 'onChange',
    defaultValues: promocode
      ? {
          code: promocode.code,
          discountType: promocode.discountType,
          discountValue: promocode.discountValue,
          maxUses: promocode.maxUses,
          minOrderValue: promocode.minOrderValue,
          userLimit: promocode.userLimit,
          startDate: promocode.startDate?.slice(0, -8),
          endDate: promocode.endDate?.slice(0, -8),
        }
      : {
          code: '',
          // discountType: '',
        },
  });

  async function onSubmit(formValues: courseFormSchema) {
    const data = {
      ...formValues,
      startDate: formValues.startDate + ':00Z',
      endDate: formValues.endDate + ':00Z',
      discountValue: +formValues.discountValue,
      minOrderValue: +formValues.minOrderValue,
      userLimit: +formValues.userLimit,
    };
    if (formValues.maxUses) {
      data.maxUses = formValues.maxUses;
    }

    if (promocode) {
      triggerVacancyEdit(data);
    } else {
      triggerVacancyCreate(data);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="code" label="Promocode nomi" required placeholder="tez_3" />

          <SelectField name="discountType" data={typeData} placeholder="Promocode turi..." label="Promocode turi" />

          <NumberTextField
            name="discountValue"
            placeholder="Chegirma miqdori"
            label="Chegirma miqdori(foiz yoki raqamligi promocode turiga bog'liq 👆 )"
          />
          <NumberTextField
            name="maxUses"
            placeholder="Procodeni amal qilish miqdori"
            label="Procodeni amal qilish miqdori (masalan: 1000 ta )"
          />

          <NumberTextField name="userLimit" placeholder="2" label="Bitta user necha marta fodalanoladi" required />

          <NumberTextField name="minOrderValue" placeholder="20 000" label="Chegirma amal qiladigan eng kam pul miqdori" required />

          <DateTimePicker name="startDate" label="Boshlanish vaqtini kiriting" />
          <DateTimePicker name="endDate" label="Tugash vaqtini kiriting" />
          {/* <DateTimePicker
            value={value}
            setValue={setValue}
            title="Hikoyani tugash vaqtini kiriting"
            defaultValue={promocode?.startDate}
            errorMessage={errorMessage}
          /> */}
        </div>
        {promocode ? (
          <LoadingButton isLoading={isCourseEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isCourseCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
