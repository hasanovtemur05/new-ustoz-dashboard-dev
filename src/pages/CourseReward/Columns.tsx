import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { LessonReward } from 'modules/course-reward-product/types';
import { Link } from 'react-router-dom';
import { getMediaUrl } from 'utils/common';
import { Badge } from 'components/ui/badge';
import { LessonRewardType } from 'modules/course-reward-product/types';
import { cn } from 'utils/styleUtils';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'components/ui/dialog';

interface IProps {
  getRowData: (notification: LessonReward) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

const renderWithTooltip = (text: string, maxLength: number = 20) => {
  if (!text || text === "...") return text || "—";
  if (text.length <= maxLength) return text;
  
  return (
    <span className="custom-tooltip font-medium cursor-help underline decoration-dotted decoration-slate-300 underline-offset-4" data-tooltip={text}>
      {text.substring(0, maxLength)}...
    </span>
  );
};

const typeMap: Record<string, { label: string; className: string }> = {
  [LessonRewardType.COIN]: { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  [LessonRewardType.PRODUCT]: { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  [LessonRewardType.PROMOCODE]: { label: 'Promocode', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  [LessonRewardType.FILE]: { label: 'Kitob', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' },
  [LessonRewardType.EMPTY]: { label: "Bo'sh", className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  [LessonRewardType.AMATEUR_CERTIFICATE]: { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  [LessonRewardType.PROGRESSIVE_CERTIFICATE]: { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<LessonReward>[] => [
  {
    id: 'index',
    header: '№',
    size: 50,
    cell: ({ row }) => (
      <span className="text-slate-500 font-medium">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Nomi',
    cell: ({ row }) => renderWithTooltip(row.original.title, 30),
  },

  {
    accessorKey: 'type',
    header: 'Turi',
    cell: ({ row }) => {
      const type = row.original.type;
      const config = typeMap[type] || { label: type, className: '' };
      return (
        <Badge variant="outline" className={cn("font-medium px-3 py-1 rounded-md", config.className)}>
          {config.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'reward',
    header: 'File / Rasm',
    cell: ({ row }) => {
      const { file, photo, title } = row.original;
      
      if (file) {
        return (
          <Link 
            to={getMediaUrl(file as string)} 
            className="text-blue-600 hover:underline flex items-center gap-1.5 font-medium text-sm" 
            target="_blank" 
            rel="noreferrer noopener"
          >
            <FileText className="w-4 h-4" /> Fayl
          </Link>
        );
      }
      
      if (photo) {
        const imageUrl = getMediaUrl(photo as string);
        return (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center justify-start cursor-pointer group relative w-16 h-10">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-16 h-10 object-cover rounded shadow-sm border border-slate-100 transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-[8px] font-bold uppercase">Ko'rish</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-transparent border-none shadow-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
                />
              </div>
            </DialogContent>
          </Dialog>
        );
      }
      
      return <span className="text-slate-400 text-[10px] italic font-normal">not file</span>;
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
