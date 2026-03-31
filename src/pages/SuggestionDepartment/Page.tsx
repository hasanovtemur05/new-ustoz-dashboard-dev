import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { SuggestionDepartmentType } from 'modules/suggestion-department/types';
import { useSuggestionDepartmentsList } from 'modules/suggestion-department/hooks/useList';
import { useDeleteSuggestionDepartment } from 'modules/suggestion-department/hooks/useDelete';

const SuggestionDepartmentPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<SuggestionDepartmentType>();

  const { data: departments, isLoading } = useSuggestionDepartmentsList();

  const { triggerDelete } = useDeleteSuggestionDepartment();
  
  const getRowData = (info: SuggestionDepartmentType) => {
    setData(info);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions 
        sheetTriggerTitle="Bo'lim qo'shish" 
        sheetTitle="Yangi bo'lim qo'shish" 
        TableForm={CustomForm} 
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={departments} />
      )}

      <Sheet sheetTitle="Bo'limni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm department={data} setSheetOpen={setSheetOpen} />
      </Sheet>
      
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={() => data && triggerDelete(data.id)}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default SuggestionDepartmentPage;
