import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { CategoryType } from 'modules/category/types';
import { useCategoriesList } from 'modules/category/hooks/useList';
import { useDeleteCategories } from 'modules/category/hooks/useDelete';
import { Pagination } from 'components/Pagination';

const CategoryPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<CategoryType>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories, isLoading, pagenationInfo } = useCategoriesList(currentPage);

  const { triggerInfoDelete } = useDeleteCategories(data?.id!);
  const getRowData = (info: CategoryType) => {
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
      <TableActions sheetTriggerTitle="Kategoriya qo'shish" sheetTitle="Yangi kategoriya qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={categories} navigateTable />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}

      <Sheet sheetTitle="Kategoriyani tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm category={data} setSheetOpen={setSheetOpen} />
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

export default CategoryPage;
