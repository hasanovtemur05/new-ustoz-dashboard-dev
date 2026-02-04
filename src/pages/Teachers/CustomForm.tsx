import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "components/ui/form";
import { FileField,  TextField } from "components/fields";
import LoadingButton from "components/LoadingButton";
import useFileUploader from "hooks/useFileUploader";
import { useState } from "react";
import { schema, useFormSchemaType } from "./schema";
import { TeacherInputType, TeacherType } from "modules/teachers/types";
import { useCreateTeacher } from "modules/teachers/hooks/useCreate";
import { useEditTeacher } from "modules/teachers/hooks/useEdit";

interface IProps {
  certificate?: TeacherType;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ certificate, setSheetOpen }: IProps) {
  const initialState =
    certificate?.fullname && certificate?.isActive ? certificate?.isActive : true;

  const [switchState, setSwitchState] = useState<boolean>(initialState);
  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();
  const { triggerCreate } = useCreateTeacher({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditTeacher({
    id: certificate?.id,
    setSheetOpen,
  });

  // get courses

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: certificate
      ? {
          fullname: certificate?.fullname,
          photo: certificate?.photo,
        }
      : {
          fullname: "",
          photo: "",
       
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    try {
     
      setState(true);
     

      const valuesWithVideo = await uploadFile<TeacherInputType>(formValues, "photo");
 

      if (certificate) {
        triggerEdit({
          ...valuesWithVideo,
        });
      } else {
        triggerCreate({
          ...valuesWithVideo,
        });
      }
    } catch (error) {
      setState(false);
      alert("Aniqlanmagan hatolik!");
    }
  }

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          <TextField name="fullname" label="Ism" required />
      
       
          {/* 
          <CustomSwitch
            state={switchState}
            setState={setSwitchState}
            labelText={
              certificate?.withId || switchState
                ? "Idli bunner"
                : "Idsiz  bunner"
            }/> */}
         

          <FileField name="photo" label="Rasm" />
         
        </div>
        {certificate ? (
          <LoadingButton isLoading={isNotificationEditPending}>
            Tahrirlash
          </LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
