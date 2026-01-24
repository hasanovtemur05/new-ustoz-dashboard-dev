import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { PremiumPlan } from 'modules/premium-plan/types';
import { usePremiumPlansList } from 'modules/premium-plan/hooks/useList';
import { useDeletePremiumPlan } from 'modules/premium-plan/hooks/useDelete';
import { Pagination } from 'components/Pagination';

const PremiumPlanPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PremiumPlan>();

  const { data: notificationsList, isLoading, paginationInfo } = usePremiumPlansList(currentPage, 200);

  const { triggerInfoDelete } = useDeletePremiumPlan(data?.id!);
  const getRowData = (info: PremiumPlan) => {
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
      <TableActions sheetTriggerTitle="Premium plan qo'shish" sheetTitle="Yangi Premium plan qo'shish" TableForm={CustomForm} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={notificationsList} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={paginationInfo} />
        </>
      )}

      <Sheet sheetTitle="Productni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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

export default PremiumPlanPage;
