import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { SuggestionDepartmentType } from 'modules/suggestion-department/types';

interface createDataColumnsProps {
  getRowData: (category: SuggestionDepartmentType) => void;
  setDialogOpen: (state: boolean) => void;
  setSheetOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setDialogOpen,
  setSheetOpen,
}: createDataColumnsProps): ColumnDef<SuggestionDepartmentType>[] => [
  {
    accessorKey: 'index',
    header: 'T/r',
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: 'title',
    header: 'Bo\'lim nomi',
  },
  {
    accessorKey: 'icon',
    header: 'Ikonka',
  },
  {
    accessorKey: 'order',
    header: 'Tartibi',
  },
  {
    accessorKey: 'isActive',
    header: 'Holati',
    cell: ({ row }) => (
      <span className={row.original.isActive ? 'text-green-500' : 'text-red-500'}>
        {row.original.isActive ? 'Faol' : 'Nofaol'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const info = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menuni ochish</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Harakatlar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                getRowData(info);
                setSheetOpen(true);
              }}
            >
              Tahrirlash
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                getRowData(info);
                setDialogOpen(true);
              }}
            >
              O'chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
