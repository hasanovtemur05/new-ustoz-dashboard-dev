import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { IMeeting } from 'modules/meeting/types';

interface IProps {
  getRowData: (course: IMeeting) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createMeetingColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<IMeeting, unknown>[] => [
  {
    accessorKey: 'title',
    header: 'Vebinar nomi',
  },
  {
    accessorKey: 'type',
    header: 'Turi',
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => (
      <a style={{ color: 'blue' }} href={row.original.link} target="_blank" rel="noreferrer noopener">
        Link
      </a>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Tarifi',
    cell: ({ row }) => (
      <div>{row.original.description?.length > 60 ? row.original.description.slice(0, 60) + '..' : row.original.description}</div>
    ),
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center ">
          <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} showAddTest={true} />
        </div>
      );
    },
  },
];
