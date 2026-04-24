import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { Edit, Trash2, ListPlus } from 'lucide-react';
import { getMediaUrl } from 'utils/common';

interface ColumnsProps {
  onEdit: (box: ILessonRewardBox) => void;
  onManageItems: (box: ILessonRewardBox) => void;
  onDelete: (id: string) => void;
}

export const createColumns = ({ onEdit, onManageItems, onDelete }: ColumnsProps): ColumnDef<ILessonRewardBox>[] => [
  {
    accessorKey: 'title',
    header: 'Sarlavha',
  },
  {
    accessorKey: 'image',
    header: 'Rasm',
    cell: ({ row }) => (
      <img src={getMediaUrl(row.original.image)} alt={row.original.title} className="w-16 h-12 object-cover rounded border" />
    ),
  },
  {
    accessorKey: 'items',
    header: 'Mukofotlar soni',
    cell: ({ row }) => row.original.items.length,
  },
  {
    id: 'actions',
    header: 'Amallar',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => onManageItems(row.original)}>
          <ListPlus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onEdit(row.original)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(row.original.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
