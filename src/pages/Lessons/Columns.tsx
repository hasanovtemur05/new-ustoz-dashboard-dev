
import { ColumnDef } from '@tanstack/react-table';
import { Lesson, LessonLinkType } from 'modules/lessons/types';
import { DataTableRowActions } from 'components/DataTableRowActions';

interface IProps {
  getRowData: (lesson: Lesson) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createLessonColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Lesson>[] => [
  {
    accessorKey: 'orderId',
    header: 'N',
  },

  {
    accessorKey: 'title',
    header: 'Dars nomi',
  },
  {
    accessorKey: 'link',
    header: 'Dars havolasi',
    cell: ({ row }) => {
      return (
        <a
          href={
            row.original.linkType === LessonLinkType.VIDEO
              ? `https://iframe.mediadelivery.net/play/504451/${row.getValue('link')}`
              : row.getValue('link')
          }
          className="hover:underline text-blue-500"
          target="_blank" rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
        >
          Havola
        </a>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Dars holati',
    cell: ({ row }) => {
      return <>{row.getValue('isActive') ? 'Faol' : 'No Faol'}</>;
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
