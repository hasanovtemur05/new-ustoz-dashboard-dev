import { ColumnDef } from '@tanstack/react-table';
import { Course } from 'modules/courses/types';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Link } from 'react-router-dom';

interface IProps {
  getRowData: (course: Course) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
}

function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export const createCourseColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage }: IProps): ColumnDef<Course, unknown>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'title',
    header: 'Kurs nomi',
  },
  {
    accessorKey: 'description',
    header: 'Davomiyligi',
    cell: ({ row }) => {
      const rawHtml: string = row.getValue('description');
      const plainText = stripHtml(rawHtml);
      const truncatedText = truncateText(plainText, 70);

      return <div title={plainText}>{truncatedText}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: 'Turi',
  },
  {
    accessorKey: 'planLessonCount',
    header: 'Rejalashtirilgan dars soni',
    cell: ({ row }) => row.getValue('planLessonCount'),
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center ">
          <DataTableRowActions
            row={row}
            getRowData={getRowData}
            setDialogOpen={setDialogOpen}
            setSheetOpen={setSheetOpen}
            showAddTest={true}
            addTestEl={<Link to={`/exam/${row.getValue('id')}`}>Yakuniy test qo'shish</Link>}
            showBattle={row.original.type === 'PROFESSION'}
            addBattleEl={<Link to={`/battle-question/${row.getValue('id')}`}>Battle test qo'shish</Link>}
          />
        </div>
      );
    },
  },
];
