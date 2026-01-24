import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { StoryV2Type } from 'modules/story-v2/types';
import { baseMediaUrl } from 'services/api';

interface IProps {
  getRowData: (notification: StoryV2Type) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<StoryV2Type>[] => [
  {
    accessorKey: 'title',
    header: 'Story title',
  },

  {
    accessorKey: 'thumbnailUrl',
    header: 'Story rasmi',
    cell: ({ row }) => {
      return (
        <a style={{ color: 'blue', cursor: 'pointer' }} target="_blank" rel="noreferrer noopener" href={`${baseMediaUrl}/${row.getValue('thumbnailUrl')}`}>
          Rasmni ko'rish
        </a>
      );
    },
  },
  {
    accessorKey: 'media',
    header: 'Medialar soni',
    cell: ({ row }) => {
      return <>{row.original.media?.length}</>;
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
