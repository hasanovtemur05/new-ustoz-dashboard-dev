import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { LessonReward } from 'modules/course-reward-product/types';
import { Link } from 'react-router-dom';
import { getMediaUrl } from 'utils/common';
import { Badge } from 'components/ui/badge';
import { LessonRewardType } from 'modules/course-reward-product/types';
import { cn } from 'utils/styleUtils';
import { FileText, ImageIcon } from 'lucide-react';

const typeMap: Record<string, { label: string; className: string }> = {
  [LessonRewardType.COIN]: { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  [LessonRewardType.PRODUCT]: { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  [LessonRewardType.PROMOCODE]: { label: 'Promocode', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  [LessonRewardType.FILE]: { label: 'File', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' },
  [LessonRewardType.EMPTY]: { label: "Bo'sh", className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  [LessonRewardType.AMATEUR_CERTIFICATE]: { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  [LessonRewardType.PROGRESSIVE_CERTIFICATE]: { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

interface IProps {
  getRowData: (notification: LessonReward) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<LessonReward>[] => [
  {
    accessorKey: 'title',
    header: 'Nomi',
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
        return (
          <div className="flex items-center gap-2">
            <img 
              src={getMediaUrl(photo as string)} 
              alt={title} 
              className="w-16 h-12 object-cover rounded-md shadow-sm border border-slate-200 transition-transform hover:scale-105" 
            />
          </div>
        );
      }
      
      return <span className="text-slate-400 text-xs italic font-normal">not file</span>;
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
