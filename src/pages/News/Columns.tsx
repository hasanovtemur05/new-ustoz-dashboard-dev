import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { News } from 'modules/news/types';
import { convertDate } from 'utils/time';

interface IProps {
  getRowData: (data: News) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}
export const createNewsColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<News>[] => [
  {
    accessorKey: 'title',
    header: 'Sarlavha',
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
