import { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

interface IProps<TData> {
  row: Row<TData>;
  getRowData: (data: TData) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  showAddTest?: boolean;
  addTestEl?: React.ReactNode;
  showBattle?: boolean;
  showDelete?: boolean;
  addBattleEl?: React.ReactNode;
}

export const DataTableRowActions = <TData,>({
  row,
  getRowData,
  setSheetOpen,
  setDialogOpen,
  showAddTest,
  addTestEl,
  showBattle,
  addBattleEl,
  showDelete = true,
}: IProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <EllipsisVertical className="h-4 w-4 stroke-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setSheetOpen(true);
            getRowData(row.original);
          }}
        >
          Tahrirlash
        </DropdownMenuItem>
        {showDelete && (
          <DropdownMenuItem
            className="text-red-500 focus:text-red-600 dark:focus:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setDialogOpen(true);
              getRowData(row.original);
            }}
          >
            O'chirish
          </DropdownMenuItem>
        )}

        {showAddTest && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {addTestEl}
          </DropdownMenuItem>
        )}
        {showBattle && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {addBattleEl}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
