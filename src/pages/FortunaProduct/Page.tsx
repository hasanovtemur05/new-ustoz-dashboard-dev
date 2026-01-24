import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { useParams } from 'react-router-dom';
import { useProductFortunaList } from 'modules/fortuna-product/hooks/useList';
import { useDeleteProductFortuna } from 'modules/fortuna-product/hooks/useDelete';
import { FortunaProduct } from 'modules/fortuna-product/types';

const FortunaProductPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<FortunaProduct>();
  // const { categoryId } = useParams();
  const { data: notificationsList, isLoading } = useProductFortunaList(20);
  const { triggerInfoDelete } = useDeleteProductFortuna(data?.id!);

  const getRowData = (info: FortunaProduct) => {
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
      <TableActions sheetTriggerTitle="Product qo'shish" sheetTitle="Yangi product qo'shish" TableForm={CustomForm} />
      {isLoading ? <Loader /> : <DataTable columns={columns} data={notificationsList} />}

      <Sheet sheetTitle="Sovg'a tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm product={data} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
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

export default FortunaProductPage;
