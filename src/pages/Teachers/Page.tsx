import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { TeacherType } from 'modules/teachers/types';
import { useTeachersList } from 'modules/teachers/hooks/useList';
import { useDeleteTeacher } from 'modules/teachers/hooks/useDelete';
import { Pagination } from 'components/Pagination';

const TeachersPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<TeacherType>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: notificationsList, isLoading, pagenationInfo } = useTeachersList(currentPage, 20);

  const { triggerInfoDelete } = useDeleteTeacher(data?.id!);
  const getRowData = (info: TeacherType) => {
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
      <TableActions sheetTriggerTitle="Ustoz  qo'shish" sheetTitle="Yangi Ustoz  qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={notificationsList} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}

      <Sheet sheetTitle="Ustoz malumotlarini tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm certificate={data} setSheetOpen={setSheetOpen} />
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

export default TeachersPage;
