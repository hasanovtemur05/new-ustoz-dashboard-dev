import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { ProductType } from 'modules/product/types';

interface IProps {
  getRowData: (notification: ProductType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<ProductType>[] => [
    {
      accessorKey: 'photo',
      header: 'Icon',
      cell: ({ row }) => {
        return <img src={`https://upload.ustozai-app.uz/${row.getValue('photo')}`} alt="img" width={80} height={60} style={{
          objectFit: "cover"
        }} loading="lazy" />;
      },
    },
    {
      accessorKey: 'title',
      header: 'Nomi',
    },
    {
      accessorKey: 'price',
      header: 'Narxi',
    },
    {
      accessorKey: 'count',
      header: 'Miqdori',
    },
    {
      accessorKey: 'isActive',
      header: 'Kategoryiya',
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
