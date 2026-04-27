import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { useParams } from 'react-router-dom';
import { LessonReward } from 'modules/course-reward-product/types';
import { useLessonRewardList } from 'modules/course-reward-product/hooks/useList';
import { useDeleteLessonReward } from 'modules/course-reward-product/hooks/useDelete';
import { useSearchParams } from 'react-router-dom';

const LessonRewardPage = () => {
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<LessonReward>();
  const selectedCourseId = searchParams.get('courseId') || '';
  
  // Templates are global library items
  const { data: rewards, isLoading } = useLessonRewardList({ pageSize: 100 } as any);
  
  const { triggerInfoDelete } = useDeleteLessonReward(data?.id!);

  const getRowData = (info: LessonReward) => {
    setData(info);
  };

  // Templates are global, no need to filter by courseId here
  const filteredRewards = rewards || [];

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-2xl whitespace-nowrap text-slate-800 dark:text-slate-100">
          Sovg'alar shabloni
        </h2>
      </div>
      <TableActions sheetTriggerTitle="Yangi shablon qo'shish" sheetTitle="Sovg'a shabloni yaratish" TableForm={CustomForm} />
      {isLoading ? <Loader /> : <DataTable columns={columns} data={filteredRewards} />}

      <Sheet sheetTitle="Sovg'a shablonini tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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

export default LessonRewardPage;
