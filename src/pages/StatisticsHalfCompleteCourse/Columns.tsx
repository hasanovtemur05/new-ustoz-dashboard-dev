import { ColumnDef } from '@tanstack/react-table';
import { HalfCompleteCourse } from 'modules/statistic-half-complete-course/types';

interface IProps {
  getRowData: (user: any) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage }: IProps): ColumnDef<any>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'firstname',
    header: 'Talaba',
    cell: ({ row }) => {
      return <>{row.original?.firstname + ' ' + row.original.lastname}</>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Tel/Email',
    cell: ({ row }) => {
      const { phone, email } = row.original;
      return <>{phone || email || '—'}</>;
    },
  },

  {
    accessorKey: 'courses',
    header: 'Kurslar',
    cell: ({ row }) => {
      const courses = row.original.courses;
      if (!courses?.length) return <>—</>;
      return (
        <ul className="list-disc pl-4">
          {courses.map((c: HalfCompleteCourse) => (
            <li key={c.id}>
              {c.title} ({c.completedLessons}/{c.totalLessons} — {c.completionPercentage}%)
            </li>
          ))}
        </ul>
      );
    },
  },
];
