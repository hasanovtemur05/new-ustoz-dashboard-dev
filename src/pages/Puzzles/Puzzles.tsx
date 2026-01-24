import { DataTable } from 'components/DataTable';
import { usePuzzlesList } from 'modules/puzzles/hooks/usePuzzlesList';
import { createPuzzleColumns } from './Columns';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { Pagination } from 'components/Pagination';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import { useState } from 'react';
import { Puzzle } from 'modules/puzzles/types';
import { useDeletePuzzle } from 'modules/puzzles/hooks/useDeletePuzzle';
import PuzzleForm from './PuzzleForm';

const Puzzles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: puzzlesList,
    paginationInfo,
    isLoading,
  } = usePuzzlesList(currentPage);
  const { triggerPuzzleDelete } = useDeletePuzzle(puzzle?.id!);

  const getRowData = (puzzle: Puzzle) => {
    setPuzzle(puzzle);
  };

  const columns = createPuzzleColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Boshqotirma qo'shish"
        sheetTitle="Yangi boshqotirma qo'shish"
        TableForm={PuzzleForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={puzzlesList} />
          <Pagination
            className="justify-end mt-3"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={paginationInfo}
          />
        </>
      )}

      <Sheet
        sheetTitle="Boshqotirmani tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <PuzzleForm puzzle={puzzle} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerPuzzleDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Puzzles;
