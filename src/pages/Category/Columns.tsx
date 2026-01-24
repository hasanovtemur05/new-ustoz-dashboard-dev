import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { CategoryType } from 'modules/category/types';


interface IProps {
  getRowData: (notification: CategoryType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<CategoryType>[] => [

    {
      accessorKey: 'title',
      header: 'Kategoriya nomi',
    },

    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive: boolean = row.getValue('isActive') || false
        return <>
          <CustomSwitch state={isActive}
            labelText={isActive ? "Ko'rinadigan" : "Ko'rinmaydigan "} />
        </>;
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
