import { useState } from "react";
import { DataTable } from "components/DataTable";
import { TableActions } from "components/TableActions";
import { Sheet } from "components/Sheet";
import { AlertDialog } from "components/AlertDialog";
import Loader from "components/Loader";
import { createDataColumns } from "./Columns";
import CustomForm from "./CustomForm";
import { useParams } from "react-router-dom";
import { useDeletePremium } from "modules/premium/hooks/useDelete";
import { Premium } from "modules/premium/types";
import { usePremiumList } from "modules/premium/hooks/useList";
import { Pagination } from "components/Pagination";

const PremiumPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<Premium>();
  // const { categoryId } = useParams();

  const { data: notificationsList, isLoading, paginationInfo } = usePremiumList(currentPage);


  const { triggerInfoDelete } = useDeletePremium(data?.id!);
  const getRowData = (info: Premium) => {
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
        sheetTriggerTitle="Premium berish"
        sheetTitle="Premium berish"
        TableForm={CustomForm}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={notificationsList} />
          <Pagination
            className="justify-end mt-3"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={paginationInfo}
          />
        </>
      )}

      <Sheet
        sheetTitle="Premiumni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm premium={data} setSheetOpen={setSheetOpen} />
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

export default PremiumPage;
