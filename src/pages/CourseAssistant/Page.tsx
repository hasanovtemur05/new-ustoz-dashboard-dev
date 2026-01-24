import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { Pagination } from 'components/Pagination';
import { useCourseAssistantList } from 'modules/course-assistant/hooks/useList';
import { useDeleteCourseAssistant } from 'modules/course-assistant/hooks/useDelete';
import { ICourseAssistant } from 'modules/course-assistant/types';

const CourseAssistantPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<ICourseAssistant>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: couseAssitants, isLoading, paginationInfo } = useCourseAssistantList(currentPage);

  const { triggerInfoDelete } = useDeleteCourseAssistant(data?.id!);
  const getRowData = (info: ICourseAssistant) => {
    setData(info);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  console.log(couseAssitants, 'courseAsistants');

  return (
    <div>
      <TableActions sheetTriggerTitle="Kurs assistantni qo'shish" sheetTitle="Yangi Kurs assistantni qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={couseAssitants} />
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

      <Sheet sheetTitle="Kurs assistantni  tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm selectedData={data} setSheetOpen={setSheetOpen} />
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

export default CourseAssistantPage;
