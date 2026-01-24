import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Donation } from 'modules/donation/types';
import { formatDateTime } from 'utils/formatDateTime';
import { numToSum } from 'utils/numberFormat';

interface IProps {
  getRowData: (notification: Donation) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage }: IProps): ColumnDef<Donation>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'amount',
    header: 'Miqdor',
    cell: ({ row }) => numToSum(row.original.amount, 100),
  },

  {
    accessorKey: 'provider',
    header: 'Tolov usuli',
    cell: ({ row }) => {
      return <>{row.original.transaction?.provider || "no" }</>;
    },
  },
  {
    accessorKey: 'profile',
    header: 'Kim tomonidan',
    cell: ({ row }) => {
      return <>{row.original.user?.firstname + ' ' + row.original.user?.lastname}</>;
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Vaqt',
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt') || '';
      return <>{formatDateTime(createdAt)}</>;
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
