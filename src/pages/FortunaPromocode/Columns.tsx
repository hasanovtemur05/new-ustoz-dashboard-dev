import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { IMarketPromocode } from 'modules/market-promocode/types';

interface IProps {
  getRowData: (notification: IMarketPromocode) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<IMarketPromocode>[] => [
  {
    accessorKey: 'title',
    header: 'Maxsulot',
  },

  {
    accessorKey: 'total',
    header: 'Umumiy soni',
  },
  {
    accessorKey: 'unused',
    header: 'Qolganlari',
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} showDelete={false} />,
  },
];
