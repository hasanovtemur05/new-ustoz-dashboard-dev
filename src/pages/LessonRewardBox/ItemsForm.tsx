import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { Button } from 'components/ui/button';
import { Trash2, Upload, FileUp } from 'lucide-react';
import { itemSchema, ItemFormValues } from './schema';
import { useAddItemToBox } from 'modules/lesson-reward-box/hooks/useAddItem';
import { useDeleteBoxItem } from 'modules/lesson-reward-box/hooks/useDeleteItem';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { useLessonRewardList } from 'modules/course-reward-product/hooks/useList';
import { useUploadPromocode } from 'modules/course-reward-promocode/hooks/useUploadPromocode';
import { useFortunaPromocodesList } from 'modules/course-reward-promocode/hooks/useList';
import normalizeImgUrl from 'utils/normalizeFileUrl';
import { useRef, useState } from 'react';

interface IProps {
  box: ILessonRewardBox;
}

export default function ItemsForm({ box }: IProps) {
  const { data: rewards } = useLessonRewardList({ pageSize: 100 });
  const { data: promocodeCounts } = useFortunaPromocodesList();
  const { mutateAsync: addItem, isPending: isAdding } = useAddItemToBox(box.courseId, box.id);
  const { mutateAsync: deleteItem } = useDeleteBoxItem(box.courseId);
  const { mutateAsync: uploadPromocode, isPending: isUploading } = useUploadPromocode();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { rewardId: '', partId: '' },
  });

  const onSubmit = async (values: ItemFormValues) => {
    const payload = { ...values };
    if (!payload.partId) {
      delete payload.partId;
    }
    await addItem(payload);
    form.reset();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, rewardId: string) => {
    const file = event.target.files?.[0];
    if (file && rewardId) {
      await uploadPromocode({ rewardId, file });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveItemId(null);
  };

  const rewardData = rewards?.map((r: any) => ({ name: r.title, type: r.id })) || [];
  const selectedReward = rewards?.find((r: any) => r.id === form.watch('rewardId'));
  const partData = selectedReward?.parts?.map((p: any) => ({ name: p.title, type: p.id })) || [];

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2 border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 flex gap-2">
            <SelectField name="rewardId" data={rewardData} label="Mukofot" placeholder="Tanlang" required />
            {partData.length > 0 && (
              <SelectField name="partId" data={partData} label="Qism" placeholder="Tanlang" />
            )}
          </div>
          <LoadingButton isLoading={isAdding} className="mb-2">Qo'shish</LoadingButton>
        </form>
      </Form>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Amaldagi mukofotlar ({box.items.length})</h3>
        <div className="flex flex-col gap-2">
          {box.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <img src={normalizeImgUrl(item.rewardPhoto)} alt={item.rewardTitle} className="w-8 h-8 rounded object-cover" />
                <div>
                  <p className="font-medium">{item.rewardTitle}</p>
                  <p className="text-xs text-gray-500">{item.rewardType}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {item.rewardType?.toUpperCase() === 'PROMOCODE' && (
                  <span className="text-[10px] text-muted-foreground mr-1">
                    Soni: {promocodeCounts?.find((r: any) => r.rewardId === item.rewardId)?.count || 0}
                  </span>
                )}
                
                <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {box.items.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4 italic">Box hozircha bo'sh</p>
          )}
        </div>
      </div>
    </div>
  );
}
