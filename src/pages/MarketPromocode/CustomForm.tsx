import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { SelectType } from 'pages/Certificate/CustomForm';
import { useProductsList } from 'modules/product/hooks/useList';
import { IMarketPromocode } from 'modules/market-promocode/types';
import { useCreateMarketPromocode } from 'modules/market-promocode/hooks/useCreate';
import { useEditMarketPromocode } from 'modules/market-promocode/hooks/useEdit';
import MediaUploadField from 'components/fields/VideoUploder';
import { useAutoGeneratePromocode } from 'modules/market-promocode/hooks/useAutoGenerate';

interface IProps {
  banner?: IMarketPromocode;
  setSheetOpen: (state: boolean) => void;
}
const createMethods = [
  {
    name: 'File',
    type: 'file',
  },
  {
    name: 'Auto Genenatsiya(ustoz ai uchun)  ',
    type: 'auto',
  },
];

export default function CustomForm({ banner, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [currentPage] = useState(1);

  const [state, setState] = useState(false);
  const { triggerCreate } = useCreateMarketPromocode({
    setSheetOpen,
  });
  const { generatePromocode } = useAutoGeneratePromocode({
    setSheetOpen,
  });
  const { triggerEdit } = useEditMarketPromocode({
    id: banner?.id,
    setSheetOpen,
  });

  const { data: productList } = useProductsList(200, currentPage, '');

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: banner
      ? {
          productId: banner.productId,
          file: banner.file,
        }
      : {
          productId: '',
          file: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const formData = new FormData();
      formData.append('file', formValues.file || '');
      formData.append('productId', formValues?.productId || '');

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
    let newArr: SelectType[] = [];
    productList.forEach((el) =>
      newArr.push({
        name: el.title,
        type: el.id,
      })
    );
    setCoursesData(newArr);
  }, [productList]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <MediaUploadField name="file" label="Promocodlar file(exel)" types={['XLS', 'XLSX']} />

          <SelectField
            name="productId"
            key="productId"
            data={coursesData}
            placeholder="Maxsulotni tanlash  tanlang..."
            label="Maxsulotni tanlash  tanglang"
          />
        </div>
        {banner ? <LoadingButton isLoading={state}>Tahrirlash</LoadingButton> : <LoadingButton isLoading={state}>Saqlash</LoadingButton>}
      </form>
    </Form>
  );
}
