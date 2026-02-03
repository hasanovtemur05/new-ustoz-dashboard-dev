import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import CourseForm from './CourseForm';
import { createVacancyColumns } from './Columns';
import { IPromocode } from 'modules/promocode/types';
import { usePromocodesList } from 'modules/promocode/hooks/useList';
import { useDeletePromocode } from 'modules/promocode/hooks/useDelete';


const PromocodePage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [course, setCourse] = useState<IPromocode>();

  const { data: coursesList, isLoading } = usePromocodesList();
  const { triggerVacancyDelete } = useDeletePromocode(course?.id!);

  const getRowData = (course: IPromocode) => {
    setCourse(course);
  };

  const columns = createVacancyColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Promocode qo'shish"
        sheetTitle="Yangi Promocode qo'shish."
        TableForm={CourseForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={coursesList}  />
      )}

      <Sheet
        sheetTitle="Promocodeni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CourseForm promocode={course} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerVacancyDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default PromocodePage;
