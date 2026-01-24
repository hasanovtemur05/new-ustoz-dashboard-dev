import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Notification } from 'modules/notifications/types';
import { convertDate } from 'utils/time';

interface IProps {
  getRowData: (notification: Notification) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createNotificationColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<Notification>[] => [
    {
      accessorKey: 'title',
      header: 'Bildirishnoma',
    },
    {
      accessorKey: 'createdAt',
      header: 'Vaqti',
      cell: ({ row }) => {
        return <div>{convertDate(row.getValue('createdAt'))}</div>;
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
