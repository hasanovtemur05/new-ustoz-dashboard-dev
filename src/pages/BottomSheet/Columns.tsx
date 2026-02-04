import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { BottomSheetCreateType } from 'modules/bottom-sheet/types';
import { baseMediaUrl } from 'services/api';

interface IProps {
  currentPage: number;
  pageSize: number;
  getRowData: (bottomsheet: BottomSheetCreateType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  currentPage,
  pageSize,
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<BottomSheetCreateType>[] => [
    {
      id: 'index',
      header: '№',
      cell: ({ row }) => {
        const index = row.index + 1;
        return <span>{(currentPage - 1) * pageSize + index}</span>;
      },
      size: 50,
    },
    
    {
      accessorKey: 'promocodeId',
      header: 'Promokod',
    },
    {
      accessorKey: 'isActive',
      header: 'Holati',
      cell: ({ row }) => (
        <span
          className={
            row.original.isActive
              ? 'text-green-600 font-semibold'
              : 'text-red-600 font-semibold'
          }
        >
          {row.original.isActive ? 'Faol' : 'Faol emas'}
        </span>
      ),
    },
    {
      accessorKey: 'photo',
      header: 'Rasm',
      cell: ({ row }) =>
        row.original.photo ? (
          <img
            src={`${baseMediaUrl}/${row.getValue("photo")}`}
            className='rounded'
            alt="img"
            width={80}
            height={60}
            style={{
              objectFit: "cover",
              maxHeight: "60px",
            }}
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">Rasm yo'q</span>
        ),
    },
    {
      accessorKey: 'id',
      header: () => <span className="sr-only">Actions</span>,
      size: 50,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <DataTableRowActions
              row={row}
              getRowData={getRowData}
              setDialogOpen={setDialogOpen}
              setSheetOpen={setSheetOpen}
            
            />
          </div>
        );
      },
    },
  ];