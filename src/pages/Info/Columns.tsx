import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { InfoType } from 'modules/info/types';

interface IProps {
  getRowData: (notification: InfoType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createInfoColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<InfoType>[] => [
    {
      accessorKey: 'photo',
      header: 'Icon',
      cell: ({ row }) => {
        return <img src={`https://upload.ustozai-app.uz/${row.getValue('photo')}`} alt="img" width={60} height={60} style={{
          objectFit: "cover"
        }} loading="lazy" />;
      },
    },
    {
      accessorKey: 'title',
      header: 'Malumot',
    },
    {
      accessorKey: 'url',
      header: 'Link',
      cell: ({ row }) => {
        return <a style={{ color: "blue" }} target="_blank" rel="noreferrer noopener" href={row.getValue('url')}>Link</a>;
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
