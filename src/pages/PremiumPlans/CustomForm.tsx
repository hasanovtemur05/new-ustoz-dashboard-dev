import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import CustomSwitch from 'components/SwitchIsDreft';
import NumberTextField from 'components/fields/Number';
import { Plus, Minus } from 'lucide-react';
import { useCreatePremiumPlan } from 'modules/premium-plan/hooks/useCreate';
import { useEditPremiumPlan } from 'modules/premium-plan/hooks/useEdit';
import { PremiumPlan } from 'modules/premium-plan/types';
interface IProps {
  product?: PremiumPlan;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ product, setSheetOpen }: IProps) {

  const initialState = product?.title ? product?.isVisible : true;
  const [switchState, setSwitchState] = useState<boolean>(initialState);
  const [state, setState] = useState(false);

  const [properties, setProperties] = useState([1]);
  const { triggerCreate } = useCreatePremiumPlan({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditPremiumPlan({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          title: product?.title,
          property1: product?.properties ? product?.properties[0] : '',
          property2: product?.properties ? product?.properties[1] : '',
          property3: product?.properties ? product?.properties[2] : '',
          property4: product?.properties ? product?.properties[3] : '',
          property5: product?.properties ? product?.properties[4] : '',
          price: +product?.price,
          isVisible: product?.isVisible,
          durationInDays: product?.durationInDays,
        }
      : {
          title: '',
          property1: '',
          property2: '',
          property3: '',
          property4: '',
          property5: '',
          price: 0,
          isVisible: switchState,
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const { title, property1, property2, property3, property4, property5, price, durationInDays } = formValues;
      const properties = [property1];
      if (property2) properties.push(property2);
      if (property3) properties.push(property3);
      if (property4) properties.push(property4);
      if (property5) properties.push(property5);
      const data = {
        isVisible: switchState,
        properties,
        title,
        price: +price,
        durationInDays: +durationInDays,
      };

      if (product) {
        triggerEdit(data);
      } else {
        triggerCreate(data);
      }
    } catch (error) {
      setState(false);
      alert('Aniqlanmagan hatolik!');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Plan nomi" required />
          <NumberTextField name="price" placeholder="Narxni kiriting" label="Narxni kiriting" required />

          <NumberTextField name="durationInDays" placeholder="Davomiyligini kiriting (kun)" label="Davomiyligini kiriting (kun)" required />

          <CustomSwitch
            state={switchState}
            setState={setSwitchState}
            labelText={product?.isVisible || switchState ? "Premium plan Ko'rinsin" : "Premium plan Ko'rinmasin "}
          />

          <div className="flex  gap-2 flex-col">
            {(product?.properties?.length ? product?.properties : properties).map((id, index) => (
              <div className="flex items-center gap-4 " key={id}>
                <TextField name={`property${index + 1}`} label={`Plan avzaligi ${index + 1}`} />

                <Minus
                  className="cursor-pointer mt-8 "
                  size={32}
                  onClick={() => {
                    if (properties.length > 1) {
                      properties.splice(index, 1);
                      setProperties([...properties]);
                    }
                  }}
                />
                <Plus
                  className="cursor-pointer mt-8 "
                  size={32}
                  onClick={() => {
                    if (properties.length < 5) {
                      setProperties([...properties, Number(properties.at(-1)) + 1]);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {product ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
