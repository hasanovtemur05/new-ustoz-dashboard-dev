import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lesson } from 'modules/lessons/types';
import { useLessonsList } from 'modules/lessons/hooks/useLessonsList';
import { useDeleteLesson } from 'modules/lessons/hooks/useDeleteLesson';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Pagination } from 'components/Pagination';
import Loader from 'components/Loader';
import LessonForm from './LessonForm';
import { createLessonColumns } from './Columns';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';

const Lessons = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [lesson, setLesson] = useState<Lesson>();
  const [currentPage, setCurrentPage] = useState(1);

  const { moduleId } = useParams();
  const {
    data: lessonsList,
    paginationInfo,
    isLoading,
  } = useLessonsList(moduleId!, currentPage);
  const { triggerLessonDelete } = useDeleteLesson(lesson?.id!);

  // const lastLessonOrder = lessonsList.at(-1)?.order;
  const getRowData = (lesson: Lesson) => {
    setLesson(lesson);
  };

  const columns = createLessonColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  console.log(paginationInfo);
  
  return (
    <div>
      <TableActions
        sheetTriggerTitle="Dars qo'shish"
        sheetTitle="Yangi dars qo'shish."
        // lastDataOrder={lastLessonOrder}
        TableForm={LessonForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={lessonsList} navigateTable />
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

      <Sheet
        sheetTitle="Darsni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <LessonForm lesson={lesson} setSheetOpen={setSheetOpen} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerLessonDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Lessons;
