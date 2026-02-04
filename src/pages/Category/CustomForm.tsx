import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import {  CategoryType } from 'modules/category/types';
import { useCreateCategories } from 'modules/category/hooks/useCreate';
import { useEditCategories } from 'modules/category/hooks/useEdit';
import CustomSwitch from 'components/SwitchIsDreft';

interface IProps {
  category?: CategoryType;
  setSheetOpen: (state: boolean) => void;
}


export default function CustomForm({
  category,
  setSheetOpen,
}: IProps) {


  const [state, setState] = useState(false)
  const initialState = category?.title ? category?.isActive : true
  const [switchState, setSwitchState] = useState<boolean>(initialState)

  const { triggerCreate } = useCreateCategories({ setSheetOpen });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditCategories({ id: category?.id, setSheetOpen});


  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: category
      ? {
        title: category?.title,
        isActive: category?.isActive,
      }
      : {
        title: "",
        isActive: switchState,
      },
  });


  async function onSubmit(formValues: useFormSchemaType) {
    try {
      setState(true)
      if (category) {
        triggerEdit({ title: formValues.title, isActive: switchState });
      } else {
        triggerCreate({ title: formValues.title, isActive: switchState });
      }
    } catch (error) {
      setState(false)
      alert("Aniqlanmagan hatolik!")
    }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">

          <TextField name="title" label="Kategoriya nomi" required />

          <CustomSwitch state={switchState} setState={setSwitchState} labelText={category?.isActive || switchState ? "Kategorya Ko'rinsin" : "Kategorya Ko'rinmasin "} />


        </div>
        {category ? (
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
