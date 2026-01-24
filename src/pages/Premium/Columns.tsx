import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { CopyIcon } from 'lucide-react';
import { Premium } from 'modules/premium/types';
import { formatDateTime } from 'utils/formatDateTime';

interface IProps {
  getRowData: (notification: Premium) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Premium>[] => [
  {
    accessorKey: 'plan',
    header: 'Tarif turi',
    cell: ({ row }) => {
      const { title }: { title: string } = row.getValue('plan') || {
        title: '',
      };
      return <>{title}</>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Narxi',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const { phone, email }: { phone?: string; email?: string } = row.getValue('user');
      const value = phone || email;
      const handleClick = () => {
        navigator.clipboard.writeText(value || '');
      };
      return (
        <>
          <div className=" p-1 rounded transition-colors flex items-center gap-2" title="Click to copy">
            {value}
            <CopyIcon onClick={handleClick} className="cursor-pointer" />
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Muddati',
    cell: ({ row }) => {
      const startDate: string = row.getValue('startDate') || '';
      const endDate: string = row.original.endDate || '';
      console.log(endDate);
      return (
        <>
          {formatDateTime(startDate, true)} / {formatDateTime(endDate, true)}
        </>
      );
    },
  },
  {
    accessorKey: 'promocode',
    header: 'Promo Code',
    cell: ({ row }) => {
      return <>{row?.original?.promocode?.code}</>;
    },
  },
  {
    accessorKey: 'isGift',
    header: "Sovg'a",
    cell: ({ row }) => {
      return <>{<CustomSwitch state={row?.original?.isGift} />}</>;
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
