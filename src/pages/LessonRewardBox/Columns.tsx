import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { Edit, Trash2, ListPlus } from 'lucide-react';
import { getMediaUrl } from 'utils/common';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'components/ui/dialog';

interface ColumnsProps {
  onEdit: (box: ILessonRewardBox) => void;
  onManageItems: (box: ILessonRewardBox) => void;
  onDelete: (id: string) => void;
}

const renderWithTooltip = (text: string, maxLength: number = 15) => {
  if (!text || text === "...") return text || "—";
  if (text.length <= maxLength) return text;
  
  return (
    <span className="custom-tooltip font-medium cursor-help underline decoration-dotted decoration-slate-300 underline-offset-4" data-tooltip={text}>
      {text.substring(0, maxLength)}...
    </span>
  );
};

export const createColumns = ({ onEdit, onManageItems, onDelete }: ColumnsProps): ColumnDef<ILessonRewardBox>[] => [
  {
    id: 'index',
    header: '№',
    size: 50,
    cell: ({ row }) => (
      <span className="text-slate-500 font-medium">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'image',
    header: 'Rasm',
    size: 100,
    cell: ({ row }) => {
      const imageUrl = getMediaUrl(row.original.image);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-center cursor-pointer group relative">
              <img 
                src={imageUrl} 
                alt={row.original.title} 
                className="w-16 h-10 object-cover rounded shadow-sm border border-slate-100 transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-[10px] font-bold">KO'RISH</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-transparent border-none shadow-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={row.original.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'lessonOrder',
    header: 'Dars raqami',
    size: 100,
    cell: ({ row }) => (
      <span className="font-semibold text-slate-600 dark:text-slate-400">
        {row.original.lessonOrder || "—"}
      </span>
    ),
  },
  {
    accessorKey: 'lessonTitle',
    header: 'Dars nomi',
    size: 250,
    cell: ({ row }) => (
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {row.original.lessonTitle || "—"}
      </span>
    ),
  },
  {
    accessorKey: 'items',
    header: 'Sovg\'alar soni',
    size: 150,
    cell: ({ row }) => (
       <div className="flex items-center gap-2">
         <span className="font-semibold text-blue-600 dark:text-blue-400">{row.original.items.length}</span>
         <span className="text-slate-400 text-xs">ta sovg'a</span>
       </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Sarlavha',
    size: 200,
    cell: ({ row }) => renderWithTooltip(row.original.title),
  },
  {
    accessorKey: 'description',
    header: 'Tafsif',
    size: 200,
    cell: ({ row }) => (
      <div className="text-slate-500 dark:text-slate-400 text-sm">
        {renderWithTooltip(row.original.description || "", 15)}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right pr-4">Amallar</div>,
    size: 80,
    cell: ({ row }) => (
      <div className="text-right pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onManageItems(row.original)} className="cursor-pointer">
              <ListPlus className="mr-2 h-4 w-4 text-blue-500" />
              <span>Sovg'alarni ko'rish</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4 text-slate-500" />
              <span>Tahrirlash</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original.id)} className="cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>O'chirish</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
