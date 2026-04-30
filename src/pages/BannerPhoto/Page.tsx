import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { BannerPhoto } from 'modules/banner-photo/types';
import { useBannerPhotosList } from 'modules/banner-photo/hooks/useList';
import { useDeleteBannerPhoto } from 'modules/banner-photo/hooks/useDelete';
import { Pagination } from 'components/Pagination';

const BannerPhotoPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false); // This is actually managed by TableActions for adding, but we might need it for editing if we add that later.
  const [selectedData, setSelectedData] = useState<BannerPhoto>();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bannerPhotos, paginationInfo, isLoading } = useBannerPhotosList(currentPage);
  
  const { triggerDelete } = useDeleteBannerPhoto(selectedData?.id!);

  const getRowData = (data: BannerPhoto) => {
    setSelectedData(data);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  const filteredData = bannerPhotos.filter((item: BannerPhoto) => 
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const BannerPhotoForm = (props: any) => <CustomForm {...props} whereIs="" />;

  return (
    <div className="flex flex-col gap-4">
      <TableActions
          sheetTriggerTitle="Banner rasm qo'shish"
          sheetTitle="Yangi Banner rasm qo'shish"
          TableForm={BannerPhotoForm}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={filteredData} />
          <Pagination 
            className="justify-end mt-3" 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            paginationInfo={paginationInfo || { count: 0, pageNumber: 1, pageSize: 10, pageCount: 0 }} 
          />
        </>
      )}

      <Sheet
        sheetTitle="Banner rasmini tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm
          banner={selectedData}
          setSheetOpen={setSheetOpen}
          whereIs=""
        />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi? "
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default BannerPhotoPage;
