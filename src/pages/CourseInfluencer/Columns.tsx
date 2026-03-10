import { ColumnDef } from '@tanstack/react-table';

interface CreateDataColumnsProps {
  getRowData: (info: any) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setDialogOpen,
}: CreateDataColumnsProps): ColumnDef<any>[] => [
  {
    header: '№',
    id: 'index',
    cell: ({ row }) => row.index + 1,
  },
  
  {
    accessorFn: row => row.user.firstname,
    id: 'firstname',
    header: 'Ism',
    cell: ({ row }) =>
      `${row.getValue('firstname')} ${row.getValue('lastname') || ''}`,
  },
  {
    accessorFn: row => row.user.lastname,
    id: 'lastname',
    header: 'Familiya',
    cell: ({ row }) => row.getValue('lastname'),
  },
  {
    accessorFn: row => row.user.username,
    id: 'username',
    header: 'Username',
    cell: ({ row }) => `@${row.getValue('username') || '—'}`,
  },
  {
    accessorFn: row => row.user.badge,
    id: 'badge',
    header: 'Badge',
    cell: ({ row }) => row.getValue('badge') || '—',
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => (
      <button
        className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={() => {
          getRowData(row.original);
          setDialogOpen(true);
        }}
      >
        O'chirish
      </button>
    ),
  },
];