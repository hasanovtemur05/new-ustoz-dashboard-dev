
import { ColumnDef } from '@tanstack/react-table';
import { Lesson, LessonLinkType, LessonVideoFormat } from 'modules/lessons/types';
import { Badge } from 'components/ui/badge';
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
    accessorKey: 'videoFormat',
    header: 'Video formati',
    cell: ({ row }) => {
      const format = row.original.videoFormat;
      if (format === LessonVideoFormat.VERTICAL) {
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
            Vertikal (Shorts)
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
          Gorizontal
        </Badge>
      );
    },
  },
  {
    accessorKey: 'link',
    header: 'Dars havolasi',
    cell: ({ row }) => {
      return (
        <a
          href={
            row.original.linkType === LessonLinkType.VIDEO
              ? `${row.getValue('link')}`
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
