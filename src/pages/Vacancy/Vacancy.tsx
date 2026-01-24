import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import CourseForm from './CourseForm';
import { createVacancyColumns } from './Columns';
import { Vacancy } from 'modules/vacancy/types';
import { useVacanciesList } from 'modules/vacancy/hooks/useCoursesList';
import { useDeleteVacancy } from 'modules/vacancy/hooks/useDeleteCourse';

const VacancyPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [course, setCourse] = useState<Vacancy>();

  const { data: coursesList, isLoading } = useVacanciesList();
  const { triggerVacancyDelete } = useDeleteVacancy(course?.id!);

  const getRowData = (course: Vacancy) => {
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
        sheetTriggerTitle="Vakansiya qo'shish"
        sheetTitle="Yangi Vakansiya qo'shish."
        TableForm={CourseForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={coursesList}  />
      )}

      <Sheet
        sheetTitle="Vakansiyani tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CourseForm vacancy={course} setSheetOpen={setSheetOpen} />
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

export default VacancyPage;
