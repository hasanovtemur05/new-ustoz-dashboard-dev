import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { IRewardPromocode } from 'modules/course-reward-promocode/types';

interface IProps {
  getRowData: (notification: IRewardPromocode) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<IRewardPromocode>[] => [
  {
    accessorKey: 'title',
    header: 'Promocode',
  },

  {
    accessorKey: 'count',
    header: 'Qolganlari',
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => (
      <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} showDelete={false} />
    ),
  },
];
