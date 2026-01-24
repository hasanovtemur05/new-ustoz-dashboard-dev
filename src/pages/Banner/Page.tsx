import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { Banner } from 'modules/banner/types';
import { useBannersList } from 'modules/banner/hooks/useList';
import { useDeleteBanner } from 'modules/banner/hooks/useDelete';


const BannerPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<Banner>();

  const { data: notificationsList, isLoading } = useBannersList();

  
  const { triggerInfoDelete } = useDeleteBanner(
    data?.id!
  );
  const getRowData = (info: Banner) => {
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
      <TableActions
        sheetTriggerTitle="Banner qo'shish"
        sheetTitle="Yangi Banner qo'shish"
        TableForm={CustomForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={notificationsList} />
      )}

      <Sheet
        sheetTitle="Bannerni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm
          banner={data}
          setSheetOpen={setSheetOpen}
        />
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

export default BannerPage;
