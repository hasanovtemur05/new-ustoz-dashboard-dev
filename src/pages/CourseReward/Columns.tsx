import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { LessonReward } from 'modules/course-reward-product/types';
import { Link } from 'react-router-dom';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (notification: LessonReward) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<LessonReward>[] => [
  {
    accessorKey: 'title',
    header: 'Nomi',
  },

  {
    accessorKey: 'type',
    header: 'Turi',
  },

  {
    accessorKey: 'reward',
    header: 'File',
    cell: ({ row }) => {
      return row.original.file ? (
        <Link to={row.original.file ? normalizeImgUrl(row.original.file as string) : '#'} className="text-blue-600" target="_blank" rel="noreferrer noopener">
          file
        </Link>
      ) : row.original.photo ? (
        <Link to={row.original.photo ? normalizeImgUrl(row.original.photo as string) : '#'} className="text-blue-600" target="_blank" rel="noreferrer noopener">
          maxsulot rasmi
        </Link>
      ) : (
        'not file'
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
