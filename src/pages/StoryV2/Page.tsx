import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { StoryV2Type } from 'modules/story-v2/types';
import { useStoriesList } from 'modules/story-v2/hooks/useList';
import { useDeleteStory } from 'modules/story-v2/hooks/useDelete';

const StoryV2Page = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<StoryV2Type>();

  const { data: notificationsList, isLoading } = useStoriesList();

  const { triggerInfoDelete } = useDeleteStory(data?.id!);
  const getRowData = (info: StoryV2Type) => {
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
      <TableActions sheetTriggerTitle="Hikoya qo'shish" sheetTitle="Yangi hikoya qo'shish" TableForm={CustomForm} />
    
      {isLoading ? <Loader /> : <DataTable columns={columns} data={notificationsList} />}

      <Sheet sheetTitle="Hikoyani tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm story={data} setSheetOpen={setSheetOpen} />
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

export default StoryV2Page;
