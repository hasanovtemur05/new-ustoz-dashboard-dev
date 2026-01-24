import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import CourseForm from './CourseForm';
import { createVacancyColumns } from './Columns';
import { IPromocode } from 'modules/promocode/types';
import { usePromocodesList } from 'modules/promocode/hooks/useList';
import { useDeletePromocode } from 'modules/promocode/hooks/useDelete';
import { Pagination } from 'components/Pagination';

const PromocodePage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [course, setCourse] = useState<IPromocode>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: coursesList, isLoading, paginationInfo } = usePromocodesList({ 
    currentPage,
    search: searchQuery 
  });
  
  const { triggerVacancyDelete } = useDeletePromocode(course?.id!);

  const getRowData = (course: IPromocode) => {
    setCourse(course);
  };

  const columns = createVacancyColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Promocode qo'shish"
        sheetTitle="Yangi Promocode qo'shish."
        TableForm={CourseForm}
        searchValue={searchQuery}
        setSearchValue={handleSearchChange}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={coursesList} />
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
        sheetTitle="Promocodeni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CourseForm promocode={course} setSheetOpen={setSheetOpen} />
      </Sheet>
      
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerVacancyDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default PromocodePage;