import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField, SearchSelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { Button } from 'components/ui/button';
import { Badge } from 'components/ui/badge';
import { LessonRewardType } from 'modules/course-reward-product/types';
import { cn } from 'utils/styleUtils';
import { Trash2, Upload, FileUp } from 'lucide-react';
import { itemSchema, ItemFormValues } from './schema';
import { useAddItemToBox } from 'modules/lesson-reward-box/hooks/useAddItem';
import { useDeleteBoxItem } from 'modules/lesson-reward-box/hooks/useDeleteItem';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { useLessonRewardList } from 'modules/course-reward-product/hooks/useList';
import { useUploadPromocode } from 'modules/course-reward-promocode/hooks/useUploadPromocode';
import { useFortunaPromocodesList } from 'modules/course-reward-promocode/hooks/useList';
import { getMediaUrl } from 'utils/common';
import { useRef, useState } from 'react';

const typeMap: Record<string, { label: string; className: string }> = {
  [LessonRewardType.COIN]: { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  [LessonRewardType.PRODUCT]: { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  [LessonRewardType.PROMOCODE]: { label: 'Promocode', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  [LessonRewardType.FILE]: { label: 'File', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' },
  [LessonRewardType.EMPTY]: { label: "Bo'sh", className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  [LessonRewardType.AMATEUR_CERTIFICATE]: { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  [LessonRewardType.PROGRESSIVE_CERTIFICATE]: { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3 p-3 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 shadow-sm">
          <div className="flex-1 grid grid-cols-12 gap-3 items-end">
            <div className={cn("col-span-12", partData.length > 0 ? "sm:col-span-7" : "sm:col-span-12")}>
              <SearchSelectField name="rewardId" data={rewardData} label="Sovg'a" placeholder="Sovg'ani tanlang" required />
            </div>
            {partData.length > 0 && (
              <div className="col-span-12 sm:col-span-5">
                <SelectField name="partId" data={partData} label="Qism" placeholder="Tanlang" />
              </div>
            )}
          </div>
          <Button type="submit" disabled={isAdding} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-none mt-5">
            {isAdding ? '...' : 'Qo\'shish'}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Amaldagi mukofotlar 
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
              {box.items.length}
            </span>
          </h3>
        </div>

        <div className="border rounded-xl overflow-hidden bg-white dark:bg-slate-900/20 shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 w-12 text-center">№</th>
                <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-400">Sovg'a nomi</th>
                <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 w-16 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {box.items.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-4 py-3 text-slate-400 font-medium text-center">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700 dark:text-slate-200">{item.rewardTitle}</span>
                        {item.partId && (() => {
                          const reward = rewards?.find((r: any) => r.id === item.rewardId);
                          const part = reward?.parts?.find((p: any) => p.id === item.partId);
                          return part ? (
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] h-5 px-1.5 font-bold uppercase border-slate-200">
                              {part.title}
                            </Badge>
                          ) : null;
                        })()}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[10px] uppercase tracking-wider font-bold", typeMap[item.rewardType as any]?.className.split(' ').find(c => c.startsWith('text-')))}>
                          {typeMap[item.rewardType as any]?.label || item.rewardType}
                        </span>
                        {item.rewardType?.toUpperCase() === 'PROMOCODE' && (
                          <span className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 rounded">
                            Zaxira: {promocodeCounts?.find((r: any) => r.rewardId === item.rewardId)?.count || 0}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteItem(item.id)} 
                      className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {box.items.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-slate-400 italic">
                    Hozircha mukofotlar biriktirilmagan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
