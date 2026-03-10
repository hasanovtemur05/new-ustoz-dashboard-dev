import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Book } from 'modules/books/types';
import { Link } from 'react-router-dom';
import { baseMediaUrl } from 'services/api';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (book: Book) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<Book>[] => [
    {
      id: "index",
      header: "№",
      size: 50,
      cell: ({ row }) => row.index + 1,
    },
    
    {
      accessorKey: "photo",
      header: "Rasm",
      cell: ({ row }) => {
        return (
          <img
            src={`${baseMediaUrl}/${row.getValue("photo")}`}
            alt="img"
            width={80}
            height={60}
            style={{
              objectFit: "cover",
              maxHeight: "60px",
            }}
            loading="lazy"
          />
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Kitob nomi',
    },
    {
      accessorKey: 'createdAt',
      header: 'Sana',
      cell: ({ row }) => {
        const date = row.getValue<string>('createdAt');
        return date ? new Date(date).toLocaleDateString('uz-UZ') : '—';
      },
    },
    {
      accessorKey: 'file',
      header: 'Fayl',
      cell: ({ row }) => (
        <Link
          to={normalizeImgUrl(row.getValue('file'))}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 underline"
        >
          Faylni ko'rish
        </Link>
      ),
    },
    {
      accessorKey: 'pagesCount',
      header: 'Sahifalar soni',
    },
    {
      accessorKey: 'description',
      header: 'Kitob haqida',
      cell: ({ row }) => {
        const text = row.getValue<string>('description');
        return <span title={text}>{text?.length > 50 ? text.slice(0, 50) + '...' : text}</span>;
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