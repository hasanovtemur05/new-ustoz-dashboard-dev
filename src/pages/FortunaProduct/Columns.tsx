import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { FortunaProduct } from 'modules/fortuna-product/types';

interface IProps {
  getRowData: (notification: FortunaProduct) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<FortunaProduct>[] => [
  {
    accessorKey: 'title',
    header: 'Nomi',
  },
  {
    accessorKey: 'probability',
    header: 'Tushish extimoligi',
  },
  {
    accessorKey: 'type',
    header: 'Turi',
  },
  {
    accessorKey: 'isActive',
    header: 'Kategoryiya',
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('isActive') || false;
      return (
        <>
          <CustomSwitch state={isActive} labelText={isActive ? "Ko'rinadigan" : "Ko'rinmaydigan "} />
        </>
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
