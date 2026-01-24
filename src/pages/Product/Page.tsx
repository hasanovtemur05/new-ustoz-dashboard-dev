import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { ProductType } from 'modules/product/types';
import { useProductsList } from 'modules/product/hooks/useList';
import { useDeleteProduct } from 'modules/product/hooks/useDelete';
import { useParams } from 'react-router-dom';
import { Pagination } from 'components/Pagination';

const ProductPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<ProductType>();
  const [currentPage, setCurrentPage] = useState(1);

  const { categoryId } = useParams();
  const { data: notificationsList, isLoading, pagenationInfo } = useProductsList(15, currentPage, categoryId ? categoryId : '');
  const { triggerInfoDelete } = useDeleteProduct(data?.id!);

  const getRowData = (info: ProductType) => {
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
      <TableActions sheetTriggerTitle="Product qo'shish" sheetTitle="Yangi product qo'shish" TableForm={CustomForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={notificationsList} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}

      <Sheet sheetTitle="Productni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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

export default ProductPage;
