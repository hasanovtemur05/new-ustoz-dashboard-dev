import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { useMarketTaskList } from 'modules/market-taskts/hooks/useList';
import { useDeleteMarketTask } from 'modules/market-taskts/hooks/useDelete';
import { IMarketTask } from 'modules/market-taskts/types';
import { Pagination } from 'components/Pagination';

const MarketTasksPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IMarketTask>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: rewards, isLoading, paginationInfo } = useMarketTaskList(20);
  const { triggerInfoDelete } = useDeleteMarketTask(data?.id!);

  const getRowData = (info: IMarketTask) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  console.log(paginationInfo, 'paginationInfo');

  return (
    <div>
      <TableActions sheetTriggerTitle="Market uchun topshiriq qo'shish" sheetTitle="Yangi topshiriq qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={rewards} />
          {paginationInfo && (
            <Pagination
              className="justify-end mt-3"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginationInfo={paginationInfo}
            />
          )}
        </>
      )}

      <Sheet sheetTitle="Market uchun topshiriqni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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

export default MarketTasksPage;
