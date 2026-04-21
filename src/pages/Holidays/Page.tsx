import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import CustomForm from './CustomForm';
import { createDataColumns } from './Column';
import { IHolidaysTypes } from 'modules/holidays/types';
import { useHolidaysList } from 'modules/holidays/hooks/useLists';
import { useDeleteHolidays } from 'modules/holidays/hooks/useDelete';

const HolidaysPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IHolidaysTypes>();

  const { data: holidaysList, isLoading } = useHolidaysList();
  const { triggerInfoDelete } = useDeleteHolidays(data?.id!);

  const getRowData = (info: IHolidaysTypes) => {
    setData(info);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Bayram qo'shish"
        sheetTitle="Yangi bayram qo'shish"
        TableForm={CustomForm}
      />
      {isLoading ? <Loader /> : <DataTable columns={columns} data={holidaysList} />}

      <Sheet
        sheetTitle="Bayramni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm holiday={data} setSheetOpen={setSheetOpen} />
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

export default HolidaysPage;
