import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { ICourseAssistant } from 'modules/course-assistant/types';
import { Link } from 'react-router-dom';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (notification: ICourseAssistant) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<ICourseAssistant>[] => [
  {
    accessorKey: 'course',
    header: 'Kurs',
    cell: ({ row }) => {
      return <>{row.original.course?.title} </>;
    },
  },
  {
    accessorKey: 'staticAnimation',
    header: 'Default animation',
    cell: ({ row }) => {
      return row.getValue('staticAnimation') ? (
        <Link
          to={row.getValue('staticAnimation') ? normalizeImgUrl(row.getValue('staticAnimation')) : '#'}
          className="text-blue-600"
          target="_blank" rel="noreferrer noopener"
        >
          file
        </Link>
      ) : (
        "yuklanmagan"
      );
    },
  },
  {
    accessorKey: 'thinkingAnimation',
    header: 'Default animation',
    cell: ({ row }) => {
      return row.getValue('thinkingAnimation') ? (
        <Link
          to={row.getValue('thinkingAnimation') ? normalizeImgUrl(row.getValue('thinkingAnimation')) : '#'}
          className="text-blue-600"
          target="_blank" rel="noreferrer noopener"
        >
          file
        </Link>
      ) : (
        "yuklanmagan"
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
