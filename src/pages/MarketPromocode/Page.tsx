import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { IMarketPromocode } from 'modules/market-promocode/types';
import { useMarketPromocodesList } from 'modules/market-promocode/hooks/useList';
import { useDeleteMarketPromocode } from 'modules/market-promocode/hooks/useDelete';
import PromocodeGenerateForm from './PromocodeGenerateForm';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';
import MediaUploadField from 'components/fields/VideoUploder';
import { checkFileSchema, useCheckFileSchemaType } from './schema';
import CheckFileForm from './CheckFileForm';

const MarketPromocodePage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isGenerateSheetOpen, setGenerateSheetOpen] = useState(false);
  const [isCheckSheetOpen, setCheckSheetOpen] = useState(false);
  const [data, setData] = useState<IMarketPromocode>();

  const { data: marketPromocodes, isLoading } = useMarketPromocodesList();

  const { triggerInfoDelete } = useDeleteMarketPromocode(data?.id!);
  const getRowData = (info: IMarketPromocode) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button onClick={() => setGenerateSheetOpen(true)}>
            <Plus className="size-4 mr-2" />
            Auto generate
          </Button>
          <Button onClick={() => setCheckSheetOpen(true)}>File ni tekshirish</Button>
        </div>

        <Button onClick={() => setSheetOpen(true)}>
          <Plus className="size-4 mr-2" />
          Do'kon uchun promocode qo'shish
        </Button>
      </div>

      {isLoading ? <Loader /> : <DataTable columns={columns} data={marketPromocodes} />}

      <Sheet sheetTitle="Do'kon uchun promocodeni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm banner={data} setSheetOpen={setSheetOpen} />
      </Sheet>

      <Sheet sheetTitle="Promocode fileni tekshirish " isOpen={isCheckSheetOpen} setSheetOpen={setCheckSheetOpen}>
        <CheckFileForm setSheetOpen={setCheckSheetOpen} />
      </Sheet>

      <Sheet sheetTitle="Auto generate" isOpen={isGenerateSheetOpen} setSheetOpen={setGenerateSheetOpen}>
        <PromocodeGenerateForm setSheetOpen={setGenerateSheetOpen} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi? "
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerInfoDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default MarketPromocodePage;
