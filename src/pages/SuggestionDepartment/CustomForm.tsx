'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { suggestionDepartmentSchema, SuggestionDepartmentSchemaType } from './schema';
import type { SuggestionDepartmentType } from 'modules/suggestion-department/types';
import CustomSwitch from 'components/SwitchIsDreft';
import { useEditSuggestionDepartment } from 'modules/suggestion-department/hooks/useEdit';
import { useCreateSuggestionDepartment } from 'modules/suggestion-department/hooks/useCreate';
import NumberTextField from 'components/fields/Number';

interface IProps {
  department?: SuggestionDepartmentType;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ department, setSheetOpen }: IProps) {
  const initialState = department?.id ? department?.isActive : true;
  const [switchState, setSwitchState] = useState<boolean>(initialState);

  const { triggerCreate, isPending: isCreatePending } = useCreateSuggestionDepartment({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isEditPending } = useEditSuggestionDepartment({
    setSheetOpen,
  });

  const form = useForm<SuggestionDepartmentSchemaType>({
    resolver: zodResolver(suggestionDepartmentSchema),
    defaultValues: {
      title: department?.title || '',
      icon: department?.icon || '',
      userId: department?.userId || '',
      order: department?.order || 0,
      isActive: department?.isActive ?? switchState,
    },
  });

  async function onSubmit(formValues: SuggestionDepartmentSchemaType) {
    const data = {
      ...formValues,
      isActive: switchState,
    };

    if (department) {
      triggerEdit({ id: department.id, values: data });
    } else {
      triggerCreate(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Bo'lim nomi" required />
          <TextField name="icon" label="Ikonka nomi (masalan: it.svg)" required />
          <TextField name="userId" label="Mas'ul admin ID (UUID)" required />
          <NumberTextField name="order" placeholder="Tartibi" label="Tartibi" />
          <CustomSwitch
            state={switchState}
            setState={setSwitchState}
            labelText={switchState ? "Bo'lim faol" : "Bo'lim nofaol"}
          />
        </div>

        <LoadingButton isLoading={isCreatePending || isEditPending}>
          {department ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}
