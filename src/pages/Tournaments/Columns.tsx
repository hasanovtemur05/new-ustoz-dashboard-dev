import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Tournament } from 'modules/tournaments/types';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/time';

export const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: 'title',
    header: 'Turnir nomi',
  },
  {
    accessorKey: 'date',
    header: 'Vaqti',
    cell: ({ row }) => {
      return <div>{convertDate(row.getValue('date'))}</div>;
    },
  },
  {
    accessorKey: 'id',
    header: 'Tahrirlash',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link to={`/courses/${row.getValue('id')}`}>
          <Button size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Button size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
