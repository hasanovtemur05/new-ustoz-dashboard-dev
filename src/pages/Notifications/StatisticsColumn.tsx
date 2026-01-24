import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Notification } from 'modules/notifications/types';
import { calculateOpenRate } from 'utils/calculateOpenRate';
import { formatDateTime } from 'utils/formatDateTime';
import { convertDate } from 'utils/time';

interface IProps {
  getRowData: (notification: Notification) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createStatisticsNotificationColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Notification>[] => [
  {
    accessorKey: 'title',
    header: 'Bildirishnoma',
  },
  {
    accessorKey: 'deliveredCount',
    header: 'Yetkazilganlar',
  },
  {
    accessorKey: 'openedCount',
    header: "O'qilganlar",
  },
  {
    accessorKey: 'test',
    header: 'Foiz hisobda',
    cell: ({ row }) => {
      return <div>{calculateOpenRate(row.original?.deliveredCount, row.original?.openedCount)}%</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Vaqti',
    cell: ({ row }) => {
      return <>{formatDateTime(row.original?.createdAt)}</>;
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
