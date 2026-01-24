import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createInfoColumns } from './Columns';
import InfoForm from './InfoForm';
import { InfoType } from 'modules/info/types';
import { useInfosList } from 'modules/info/hooks/useInfosList';
import { useDeleteInfo } from 'modules/info/hooks/useDeleteInfo';


const Info = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [info, setInfo] = useState<InfoType>();

  const { data: notificationsList, isLoading } = useInfosList();


  const { triggerInfoDelete } = useDeleteInfo(
    info?.id!
  );

  const getRowData = (info: InfoType) => {
    setInfo(info);
  };

  const columns = createInfoColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Malumot qo'shish"
        sheetTitle="Yangi malumot qo'shish"
        TableForm={InfoForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={notificationsList} />
      )}

      <Sheet
        sheetTitle="Malumotni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <InfoForm
          notification={info}
          setSheetOpen={setSheetOpen}
        />
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

export default Info;
