import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';

import { Pagination } from 'components/Pagination';
import { useSurveyList } from 'modules/survey/hooks/useList';
import { useDeleteSurvey } from 'modules/survey/hooks/useDelete';
import { ISurvey } from 'modules/survey/types';

const SurveyPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<ISurvey>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: surveys, isLoading, paginationInfo } = useSurveyList(20);
  const { triggerInfoDelete } = useDeleteSurvey(data?.id!);

  const getRowData = (info: ISurvey) => {
    setData(info);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions sheetTriggerTitle="So'rovnoma qo'shish" sheetTitle="Yangi so'rovnoma qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={surveys} />
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

      <Sheet sheetTitle="So'rovnomani tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm product={data} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz so'rovnomani o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerInfoDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default SurveyPage;
