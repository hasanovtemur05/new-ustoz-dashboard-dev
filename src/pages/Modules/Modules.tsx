import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Module } from 'modules/modules/types';
import { useModulesList } from 'modules/modules/hooks/useModulesList';
import { useDeleteModule } from 'modules/modules/hooks/useDeleteModule';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import Loader from 'components/Loader';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import { createModuleColumns } from './Columns';
import ModuleForm from './ModulesForm';

const Modules = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [module, setModule] = useState<Module>();

  const { courseId } = useParams();
  const { data: modulesList, isLoading } = useModulesList(courseId!);
  const { triggerModuleDelete } = useDeleteModule(module?.id!);
console.log(modulesList);

  // const lastModuleOrder = modulesList.at(-1)?.order;

  const getRowData = (module: Module) => {
    setModule(module);
  };

  const columns = createModuleColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  console.log(modulesList ,"data");
  
  return (
    <div>
      <TableActions
        sheetTriggerTitle="Bo'lim qo'shish"
        sheetTitle="Yangi bo'lim qo'shish."
        // lastDataOrder={lastModuleOrder}
        TableForm={ModuleForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={modulesList} navigateTable />
      )}

      <Sheet
        sheetTitle="Bo'limni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <ModuleForm setSheetOpen={setSheetOpen} module={module} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerModuleDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Modules;
