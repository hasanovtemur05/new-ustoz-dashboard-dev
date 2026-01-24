import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { SelectType } from 'pages/Certificate/CustomForm';

import MediaUploadField from 'components/fields/VideoUploder';
import { useAutoGeneratePromocode } from 'modules/market-promocode/hooks/useAutoGenerate';
import { useEditFortunaPromocode } from 'modules/course-reward-promocode/hooks/useEdit';
import { useCreateFortunaPromocode } from 'modules/course-reward-promocode/hooks/useCreate';
import { usePromocodeProductsList } from 'modules/course-reward-promocode/hooks/usePromocodeProductsList';
import { IRewardPromocode } from 'modules/course-reward-promocode/types';

interface IProps {
  banner?: IRewardPromocode;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ banner, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);

  const [state, setState] = useState(false);
  const { triggerCreate } = useCreateFortunaPromocode({
    setSheetOpen,
  });
  const { generatePromocode } = useAutoGeneratePromocode({
    setSheetOpen,
  });

  const { triggerEdit } = useEditFortunaPromocode({
    id: banner?.id,
    setSheetOpen,
  });

  const { data: productList } = usePromocodeProductsList();

  console.log(productList, 'productList');

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: banner
      ? {
          rewardId: banner.rewardId,
          file: banner.file,
        }
      : {
          rewardId: '',
          file: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const formData = new FormData();
      formData.append('file', formValues.file || '');
      formData.append('rewardId', formValues?.rewardId || '');

      if (banner) {
        triggerEdit(formData);
      } else {
        triggerCreate(formData);
      }
    } catch (error) {
      setState(false);
      alert('Aniqlanmagan hatolik!');
    }
  }

  useEffect(() => {
    if (productList && productList.length > 0) {
      const newArr: SelectType[] = productList.map((el) => ({
        name: el.title,
        type: el.id || el.rewardId,
      }));
      console.log(newArr, 'newArr');
      setCoursesData(newArr);
    }
  }, [productList]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <MediaUploadField name="file" label="Promocodlar file(exel)" types={['XLS', 'XLSX']} />

          <SelectField
            name="rewardId"
            key="rewardId"
            data={coursesData}
            placeholder="Sovg'ani tanlash  tanlang..."
            label="Sovg'ani tanlash  tanglang"
          />
        </div>
        {banner ? <LoadingButton isLoading={state}>Tahrirlash</LoadingButton> : <LoadingButton isLoading={state}>Saqlash</LoadingButton>}
      </form>
    </Form>
  );
}
