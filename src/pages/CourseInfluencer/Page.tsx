// modules/course-influencer/pages/CourseInfluencerPage.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { useInfluencerList } from 'modules/course-influencer/hooks/useDataLists';
import { useDeleteInfluencer } from 'modules/course-influencer/hooks/useDelete';
import { Influencer } from 'modules/course-influencer/types';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';

const CourseInfluencerPage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: influencerData, isLoading } = useInfluencerList(courseId!);
  
  const tableData = influencerData || [];

  const [selectedData, setSelectedData] = useState<Influencer | undefined>();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { triggerInfoDelete } = useDeleteInfluencer(selectedData?.id!);

  const getRowData = (info: Influencer) => {
    setSelectedData(info);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
  });

  

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Kurs influencerni qo'shish"
        sheetTitle="Yangi Kurs influencerni qo'shish"
        TableForm={(props: any) => (
          <CustomForm {...props} courseId={courseId!} />
        )}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

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

export default CourseInfluencerPage;