import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Module } from 'modules/modules/types';

import { Form } from 'components/ui/form';
import { SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCreateModule } from 'modules/modules/hooks/useCreateModule';
import { useEditModule } from 'modules/modules/hooks/useEditModule';
import CustomSwitch from 'components/SwitchIsDreft';
import { useEffect, useState } from 'react';

const createModuleSchema = (type: string | null) => {
  const baseSchema = z.object({
    title: z.string().min(3),
    isActive: z.boolean().optional(),
  });

  if (type === 'PAID') {
    return baseSchema.extend({
      degree: z.string().min(1, "Daraja tanlanishi shart"),
    });
  }

  return baseSchema.extend({
    degree: z.string().optional(),
  });
};


interface IProps {
  module?: Module;
  lastDataOrder?: number;
  setSheetOpen: (state: boolean) => void;
}

const levelData = [
  { type: 'EASY', name: 'Oson' },
  { type: 'MEDIUM', name: "O'rtacha" },
  { type: 'HARD', name: 'Qiyin' },
];

export default function ModuleForm({ module, lastDataOrder: lastModuleOrder, setSheetOpen }: IProps) {
  const { courseId } = useParams();
  const [params] = useSearchParams();
  const type = params.get('type');
  const initialState = module?.title ? module?.isActive : true;

 const moduleSchema = createModuleSchema(type);
  type moduleFormSchema = z.infer<typeof moduleSchema>;
  const [switchState, setSwitchState] = useState<boolean>(initialState);
  const { triggerModuleCreate, isPending: isModuleCreatePending } = useCreateModule({ setSheetOpen });

  const { triggerModuleEdit, isPending: isModuleEditPending } = useEditModule({
    id: module?.id,
    setSheetOpen,
  });

  const form = useForm<moduleFormSchema>({
    resolver: zodResolver(createModuleSchema(type)),
    defaultValues: module
     ? {
          title: module.title,
          degree: module?.degree || '', 
        }
      : {
          title: '',
          degree: '', 
        },
  });



  async function onSubmit(formValues: moduleFormSchema) {
    const payload = { ...formValues, isActive: switchState, courseId: courseId ? courseId.toString() : '' };
    if (module) {
      triggerModuleEdit(payload);
    } else {
      triggerModuleCreate(payload);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Bo'lim nomi" required />
          {type === 'PAID' && <SelectField name="degree" data={levelData} placeholder="Module darajasini tanlang..." label="Module darajasi" />}
          <CustomSwitch
            state={switchState}
            setState={setSwitchState}
            labelText={switchState ? "Ko'rinadigan bo'lim" : "Ko'rinmaydigan bo'lim"}
          />
        </div>
        {module ? (
          <LoadingButton isLoading={isModuleEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isModuleCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
