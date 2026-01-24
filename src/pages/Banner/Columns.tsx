import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Banner } from 'modules/banner/types';
import { Link } from 'react-router-dom';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (notification: Banner) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Banner>[] => [
  {
    accessorKey: 'photo',
    header: 'Rasm',
    cell: ({ row }) => {
      return (
        <Link to={normalizeImgUrl(row.getValue('photo'))} target="_blank" rel="noreferrer noopener" className="text-blue-600">
          file
        </Link>
      );
    },
  },

  {
    accessorKey: 'type',
    header: 'Banner turi',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
