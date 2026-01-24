import { ColumnDef } from '@tanstack/react-table';
import { Puzzle } from 'modules/puzzles/types';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { puzzleDifficulties } from 'constants/index';

interface IProps {
  getRowData: (puzzle: Puzzle) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createPuzzleColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<Puzzle>[] => [
  {
    accessorKey: 'title',
    header: 'Boshqotirma',
  },
  {
    accessorKey: 'puzzle_type',
    header: 'Boshqotirma darajasi',
    cell: ({ row }) => {
      const difficulty = puzzleDifficulties.find(
        item => item.type === row.getValue('puzzle_type')
      );
      return <span>{difficulty?.name}</span>;
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        getRowData={getRowData}
        setDialogOpen={setDialogOpen}
        setSheetOpen={setSheetOpen}
      />
    ),
  },
];
