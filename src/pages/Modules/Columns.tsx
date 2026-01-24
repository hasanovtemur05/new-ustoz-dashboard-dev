import { ColumnDef } from '@tanstack/react-table';
import { Module } from 'modules/modules/types';
import { DataTableRowActions } from 'components/DataTableRowActions';
// import { timeConverter } from 'utils/timeConverter';

interface IProps {
  getRowData: (module: Module) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createModuleColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<Module>[] => [
  {
    accessorKey: 'title',
    header: "Bo'lim nomi",
   
  },
  {
    accessorKey: 'isActive',
    header: 'Holati',
    size: 140,
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as number;
      return <span>{isActive ? 'Faol':'Faol emas'}</span>;
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
