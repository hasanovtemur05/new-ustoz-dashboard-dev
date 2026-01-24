import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { IMarketTask } from 'modules/market-taskts/types';
import { Link } from 'react-router-dom';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (notification: IMarketTask) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<IMarketTask>[] => [
  {
    accessorKey: 'title',
    header: 'Nomi',
  },

  {
    accessorKey: 'points',
    header: 'Points',
  },

  {
    accessorKey: 'photo',
    header: 'Rasm',
    cell: ({ row }) => {
      return (
        <Link to={normalizeImgUrl(row.getValue('photo'))} className="text-blue-600" target="_blank" rel="noreferrer noopener">
          file
        </Link>
      );
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
