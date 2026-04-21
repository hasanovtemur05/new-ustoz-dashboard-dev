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
      accessorKey: 'content',
      header: 'Tavsif',
      cell: ({ row }) => {
        const rawContent = row.original.content || '';
        const strippedContent = rawContent.replace(/<[^>]*>?/gm, '');
        return (
          <div className="text-sm truncate max-w-[200px]" title={strippedContent}>
            {strippedContent}
          </div>
        );
      },
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
      accessorKey: 'type',
      header: 'Turi',
      cell: ({ row }) => {
        const type = row.original.type;
        if (type === 'AI_ASSISTANT') return <span>AI Assistant</span>;
        if (type === 'PROMOCODE') return <span>Promocode</span>;
        return <span>Jismoniy</span>;
      },
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
