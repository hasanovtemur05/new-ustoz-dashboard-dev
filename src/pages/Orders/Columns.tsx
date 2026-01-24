import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { OrderStatusButton } from 'components/OrderStatusButton';
import { CopyIcon } from 'lucide-react';
import { IOrder } from 'modules/orders/types';
import { formatDateTime } from 'utils/formatDateTime';

interface IProps {
  getRowData: (notification: IOrder) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage }: IProps): ColumnDef<IOrder>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'product',
    header: 'Maxsulot',
    cell: ({ row }) => {
      return <> {row.original?.product ? row.original.product?.title + ' - ' + `${row.original.product?.count} ta` : 'No'} </>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Narxi',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const fName = row?.original?.user?.firstname;
      const lName = row?.original?.user?.lastname;
      return <> {fName ? fName + ' ' + lName : 'No'} </>;
    },
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const phone = row.original?.user?.phone;
      const handleClick = () => {
        navigator.clipboard.writeText(phone || '');
      };
      return (
        <>
          <div className=" p-1 rounded transition-colors flex items-center gap-2" title="Click to copy">
            {phone}
            <CopyIcon onClick={handleClick} className="cursor-pointer" />
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <OrderStatusButton row={row} getRowData={getRowData} />;
    },
  },
  {
    accessorKey: 'comment',
    header: 'Izoh',
    cell: ({ row }) => {
      return <>{row.getValue('comment')}</>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Buyurtma qilingan vaqt',
    cell: ({ row }) => {
      return <>{formatDateTime(row.getValue('createdAt'))}</>;
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
