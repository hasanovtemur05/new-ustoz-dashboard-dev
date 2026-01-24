import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import CourseForm from './CourseForm';
import { createMeetingColumns } from './Columns';
import { useMeetingsList } from 'modules/meeting/hooks/useList';
import { useDeleteMeeting } from 'modules/meeting/hooks/useDelete';
import { IMeeting } from 'modules/meeting/types';

const MeetingPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [course, setCourse] = useState<IMeeting>();

  const { data: coursesList, isLoading } = useMeetingsList();
  const { triggerMeeetingDelete } = useDeleteMeeting(course?.id!);

  const getRowData = (course: IMeeting) => {
    setCourse(course);
  };

  const columns = createMeetingColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Vebinar qo'shish"
        sheetTitle="Yangi Vebinar qo'shish."
        TableForm={CourseForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={coursesList}  />
      )}

      <Sheet
        sheetTitle="Vebinarni tahrirlash"
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
        alertActionFunction={triggerMeeetingDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default MeetingPage;
