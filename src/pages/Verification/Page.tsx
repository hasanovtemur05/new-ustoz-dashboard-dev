import { useState } from 'react';
import { useVerificationList } from 'modules/verification/hooks/useList';
import { useApproveVerification, useRejectVerification } from 'modules/verification/hooks/useEdit';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { Sheet } from 'components/Sheet';
import { Pagination } from 'components/Pagination';
import { createVerificationColumns } from './Column';
import CustomForm from './CustomForm';
import { VerificationFormValues } from './schema';

const VerificationPage = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { list, paginationInfo, isLoading } = useVerificationList({ pageNumber: currentPage, pageSize: 10 });
  const { mutate: approve } = useApproveVerification();
  const { mutate: reject, isPending: isRejecting } = useRejectVerification();

  const handleApprove = (id: string) => {
    if (window.confirm('Haqiqatdan ham tasdiqlaysizmi?')) {
      approve(id);
    }
  };

  const handleRejectClick = (id: string) => {
    setSelectedId(id);
    setSheetOpen(true);
  };

  const handleRejectSubmit = (values: VerificationFormValues) => {
    if (selectedId) {
      reject({ id: selectedId, rejectReason: values.reject_reason }, {
        onSuccess: () => {
          setSheetOpen(false);
          setSelectedId(null);
        }
      });
    }
  };

  const columns = createVerificationColumns({
    onApprove: handleApprove,
    onReject: handleRejectClick,
    pageNumber: currentPage,
    pageSize: 10,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Maxsus</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          <DataTable columns={columns} data={list || []} />
          <Pagination
            className="justify-end"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={paginationInfo || { count: 0, pageNumber: 1, pageSize: 10, pageCount: 0 }}
          />
        </div>
      )}

      <Sheet
        sheetTitle="Rad etish sababini kiriting"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm onSubmit={handleRejectSubmit} isLoading={isRejecting} />
      </Sheet>
    </div>
  );
};

export default VerificationPage;
