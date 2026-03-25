import { useState } from 'react';
import { useVerificationList } from 'modules/verification/hooks/useList';
import { useApproveVerification, useRejectVerification } from 'modules/verification/hooks/useEdit';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { Sheet } from 'components/Sheet';
import { createVerificationColumns } from './Column';
import CustomForm from './CustomForm';
import { VerificationFormValues } from './schema';

const VerificationPage = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: list, isLoading } = useVerificationList({});
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
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Maxsus</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={list || []} />
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
