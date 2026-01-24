import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { useBottomShettList } from 'modules/bottom-sheet/hooks/useList';
import { createDataColumns } from './Columns';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';
import { Pagination } from 'components/Pagination';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from 'components/ui/alert-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'components/ui/sheet';
import { useDeleteBottomSheet } from 'modules/bottom-sheet/hooks/useDelete';
import BottomSheetForm from './PromocodeForm'; 
import { BottomSheetCreateType } from 'modules/bottom-sheet/types';

const BottomSheet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BottomSheetCreateType | null>(null);

 const { data: response, isLoading } = useBottomShettList({
  pageNumber: currentPage,
});

const bottomsheetdata = response?.data?.data ?? [];       // ARRAY for DataTable
const paginationInfo = response?.data?.meta?.pagination;


  const pageSize = paginationInfo?.pageSize ?? 10;

  const { triggerInfoDelete } = useDeleteBottomSheet(selectedRow?.id || '');

  const getRowData = (rowData: BottomSheetCreateType) => {
    setSelectedRow(rowData);
  };

  const handleDelete = () => {
    triggerInfoDelete(selectedRow?.id || '');
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
    setSelectedRow(null);
  };

  const columns = createDataColumns({
    currentPage,
    pageSize,
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Bottom Sheet</h1>
        <Button onClick={() => setSheetOpen(true)}>
          <Plus className="size-4 mr-2" />
          Bottom Sheet qo'shish
        </Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={bottomsheetdata} />

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

      {/* Create/Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedRow ? 'Bottom Sheet tahrirlash' : 'Bottom Sheet yaratish'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <BottomSheetForm
              setSheetOpen={setSheetOpen}
              initialData={selectedRow}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ishonchingiz komilmi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Davom etish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BottomSheet;