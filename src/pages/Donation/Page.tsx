import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { useDonationsList } from 'modules/donation/hooks/useList';
import { Donation } from 'modules/donation/types';
import { Pagination } from 'components/Pagination';

const DonationPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<Donation>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories, isLoading, pagenationInfo } = useDonationsList(currentPage);

  const getRowData = (info: Donation) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
    currentPage,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Jami {pagenationInfo?.count || 0} ta </h2>
        <h1 className="text-2xl font-bold">Donation</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={categories} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}
    </div>
  );
};

export default DonationPage;
