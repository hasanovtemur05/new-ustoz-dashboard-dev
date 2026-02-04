import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Switch } from 'components/ui/switch';
import { Button } from 'components/ui/button';
import LoadingButton from 'components/LoadingButton';
import { useState, useEffect, useRef } from 'react';
import { z } from 'zod';
import { useCreateBottomSheet } from 'modules/bottom-sheet/hooks/useCreate';
import { useEditBottomSheet } from 'modules/bottom-sheet/hooks/useEdit';
import { BottomSheetCreateType } from 'modules/bottom-sheet/types';
import MediaUploadField from 'components/fields/VideoUploder';
import useFileUploader from 'hooks/useFileUploader';
import { usePromocodesList } from 'modules/promocode/hooks/useList';
import { IPromocode } from 'modules/promocode/types';
import { Search } from 'lucide-react';

const bottomSheetSchema = z.object({
  promocodeId: z.string().min(1, 'Promocode ID talab qilinadi'),
  isActive: z.boolean().default(true),
  photo: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type BottomSheetFormType = z.infer<typeof bottomSheetSchema>;

interface IProps {
  setSheetOpen: (state: boolean) => void;
  initialData?: BottomSheetCreateType | null;
}

export default function BottomSheetForm({ setSheetOpen, initialData }: IProps) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPromocode, setSelectedPromocode] = useState<IPromocode | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { uploadFile } = useFileUploader();

  const { data: promocodesList, isLoading: isPromocodesLoading } = usePromocodesList({
    currentPage: 1,
    search: searchQuery,
  });

  const { triggerCreate } = useCreateBottomSheet({
    setSheetOpen,
  });

  const { triggerEdit, isPending: isEditPending } = useEditBottomSheet({
    id: initialData?.id,
    setSheetOpen,
  });

  const form = useForm<BottomSheetFormType>({
    resolver: zodResolver(bottomSheetSchema),
    defaultValues: initialData
      ? {
          promocodeId: initialData.promocodeId || '',
          isActive: initialData.isActive ?? true,
          photo: initialData.photo || null,
        }
      : {
          promocodeId: '',
          isActive: true,
          photo: null,
        },
  });

  useEffect(() => {
    if (initialData?.promocodeId) {
      const foundPromocode = promocodesList?.find(
        (p) => p.id === initialData.promocodeId
      );
      if (foundPromocode) {
        setSelectedPromocode(foundPromocode);
      }
    }
  }, [initialData, promocodesList]);

  // Tashqariga bosganda dropdown yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  async function onSubmit(values: BottomSheetFormType) {
    try {
      setLoading(true);

      const valuesWithPhoto = await uploadFile<BottomSheetCreateType>(values, 'photo');


      if (initialData) {
        await triggerEdit(valuesWithPhoto);
      } else {
        await triggerCreate(valuesWithPhoto);
      }
    } catch (error) {
      setLoading(false);
      console.error('Submit error:', error);
      alert('Aniqlanmagan xatolik!');
    }
  }

  const handlePromocodeSelect = (promocode: IPromocode) => {
    setSelectedPromocode(promocode);
    form.setValue('promocodeId', promocode.id);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim().length > 0) {
      setShowDropdown(true);
    }
  };

  const isLoading = loading || isEditPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="promocodeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Promocode <span className="text-red-500">*</span>
              </FormLabel>
              <div className="relative">
                {selectedPromocode ? (
                  <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <div>
                      <p className="font-medium">{selectedPromocode.code}</p>
                      <p className="text-sm text-gray-500">
                        {selectedPromocode.discountType === 'PERCENT' 
                          ? `${selectedPromocode.discountValue}% chegirma`
                          : `${selectedPromocode.discountValue} so'm chegirma`
                        }
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPromocode(null);
                        form.setValue('promocodeId', '');
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      O'chirish
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Promocode qidirish..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onClick={() => setShowDropdown(true)}
                      />
                      <Button 
                        size="icon" 
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <Search className="size-4" />
                      </Button>
                    </div>

                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {isPromocodesLoading ? (
                          <div className="p-4 text-center text-gray-500">
                            Yuklanmoqda...
                          </div>
                        ) : promocodesList && promocodesList.length > 0 ? (
                          promocodesList.map((promocode) => (
                            <div
                              key={promocode.id}
                              onClick={() => handlePromocodeSelect(promocode)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                            >
                              <p className="font-medium">{promocode.code}</p>
                              <p className="text-sm text-gray-500">
                                {promocode.discountType === 'PERCENT'
                                  ? `${promocode.discountValue}% chegirma`
                                  : `${promocode.discountValue} so'm chegirma`
                                }
                              </p>
                              
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            {searchQuery
                              ? 'Promocode topilmadi'
                              : 'Qidirish uchun matn kiriting'}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                <input type="hidden" {...field} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Holati</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Bottom sheet faol yoki faol emasligini belgilang
                </div>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <MediaUploadField
          name="photo"
          label="Rasm yuklash"
          types={['JPG', 'PNG', 'JPEG', 'WEBP']}
          defaultValue={initialData?.photo}
        />

        {initialData ? (
          <LoadingButton isLoading={isLoading}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isLoading}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}