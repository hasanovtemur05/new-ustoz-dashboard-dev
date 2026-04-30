import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { BannerPhoto } from 'modules/banner-photo/types';
import { Link } from 'react-router-dom';
import { getMediaUrl } from 'utils/common';

interface IProps {
  getRowData: (data: BannerPhoto) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<BannerPhoto>[] => [
  {
    accessorKey: 'photo',
    header: 'Rasm',
    cell: ({ row }) => {
      const photo = row.getValue('photo') as string;
      const imageUrl = getMediaUrl(photo);
      return (
        <Link to={imageUrl} target="_blank" rel="noreferrer noopener" className="text-blue-600">
           <img src={imageUrl} alt="banner" className="h-10 w-16 object-cover rounded shadow-sm border" />
        </Link>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Sarlavha',
  },
  {
    accessorKey: 'whereIs',
    header: 'Joylashuv',
  },
  {
    accessorKey: 'createdAt',
    header: 'Yaratilgan sana',
    cell: ({ row }) => {
        const date = row.getValue('createdAt') as string;
        return date ? new Date(date).toLocaleString() : '';
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
