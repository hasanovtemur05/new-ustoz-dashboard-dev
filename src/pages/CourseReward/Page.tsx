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

const LessonRewardPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<LessonReward>();
  // const { categoryId } = useParams();
  const { data: rewards, isLoading } = useLessonRewardList(20);
  const { triggerInfoDelete } = useDeleteLessonReward(data?.id!);

  const getRowData = (info: LessonReward) => {
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
      <TableActions sheetTriggerTitle="Darslar uchun sovg'a qo'shish" sheetTitle="Yangi sovg'a qo'shish" TableForm={CustomForm} />
      {isLoading ? <Loader /> : <DataTable columns={columns} data={rewards} />}

      <Sheet sheetTitle="Darslar uchun  sovg'ani tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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
