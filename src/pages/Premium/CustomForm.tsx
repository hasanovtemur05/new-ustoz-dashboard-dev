import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { Premium } from 'modules/premium/types';
import { usePremiumPlansList } from 'modules/premium-plan/hooks/useList';

import SelectWithInput from 'components/fields/SelectWithInput';
import { useDebounce } from 'hooks/useDebounce';
import { useCreatePremium } from 'modules/premium/hooks/useCreate';
import { useEditPremium } from 'modules/premium/hooks/useEdit';
import { SelectType } from 'pages/Certificate/CustomForm';
import { useUsersListForPremium } from 'modules/premium/hooks/useList';

interface IProps {
  premium?: Premium;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ premium, setSheetOpen }: IProps) {
  // const { categoryId } = useParams();
  const [state, setState] = useState(false);
  // const [properties, setProperties] = useState([1]);
  const [currentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [planesData, setplanesData] = useState<SelectType[]>([]);
  const [usersData, setUsersData] = useState<SelectType[]>([]);

  // const { uploadFile } = useFileUploader();
  const { data: planList, isLoading } = usePremiumPlansList(currentPage, 10);

  const { triggerCreate } = useCreatePremium({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditPremium({
    id: premium?.id,
    setSheetOpen,
  });

  const { data: usersList, isLoading: isUsersLoading } = useUsersListForPremium(currentPage, debouncedSearchValue);

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: premium
      ? {
          // title: product?.title,
          // price: +product?.price,
          // is_visible: product?.is_visible,
        }
      : {
          // title: "",
          // property1: "",
          // property2: "",
          // property3: "",
          // property4: "",
          // property5: "",
          // price: 0,
          // is_visible: switchState,
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      if (premium) {
        triggerEdit(formValues);
      } else {
        triggerCreate(formValues);
      }
    } catch (error) {
      setState(false);
      alert('Aniqlanmagan hatolik!');
    }
  }

  useEffect(() => {
    setplanesData(
      planList?.map((el) => ({
        name: el.title,
        type: el.id,
      })) ?? []
    );
  }, [planList]);

  useEffect(() => {
    if (usersList?.length) {
      setUsersData(
        usersList.map((user) => ({
          name: `${user.first_name} ${user.last_name} ${user.phone_number || user.email}`,
          type: user.user,
        }))
      );
    }
  }, [usersList]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <SelectField
            name="plan"
            data={planesData}
            placeholder={`${isLoading && !planList ? 'Planlar hali yuklanmagan...' : 'Planni tanlang...'}`}
            label="Planni tanglang"
          />

          <SelectWithInput
            name="user"
            label="Foydalanuvchi"
            placeholder="Foydalanuvchini qidiring..."
            data={usersData}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isLoading={isUsersLoading}
          />
        </div>
        {premium ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
