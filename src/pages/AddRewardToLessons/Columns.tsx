import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { ICourseReward } from 'modules/add-reward-to-lessons/types';
import { Badge } from 'components/ui/badge';
import { getMediaUrl } from 'utils/common';
import { LessonRewardType } from 'modules/course-reward-product/types';
import { cn } from 'utils/styleUtils';
interface IProps {
  getRowData: (notification: ICourseReward) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}



const typeMap: Record<string, { label: string; className: string }> = {
  'COIN': { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  'PRODUCT': { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  'PROMOCODE': { label: 'Promokod', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  'FILE': { label: 'Kitob', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' },
  'AMATEUR_CERTIFICATE': { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  'PROGRESSIVE_CERTIFICATE': { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<ICourseReward>[] => [
  {
    accessorKey: 'orderId',
    header: 'Tartib',
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'Dars nomi',
  },
  {
    accessorKey: 'rewardPhoto',
    header: 'Rasm',
    cell: ({ row }) => {
      const photo = row.original.rewardPhoto;
      if (!photo) return null;
      return (
        <img 
          src={getMediaUrl(photo)} 
          alt="reward" 
          className="w-10 h-10 object-cover rounded-md border border-slate-200 shadow-sm" 
        />
      );
    },
  },
  {
    accessorKey: 'reward',
    header: 'Sovg\'a',
  },
  {
    accessorKey: 'rewardType',
    header: 'Turi',
    cell: ({ row }) => {
      const type = row.original.rewardType?.toUpperCase();
      if (!type) return null;
      const config = typeMap[type] || { label: type, className: '' };
      return (
        <Badge variant="outline" className={cn("font-medium px-2 py-0.5 rounded-md", config.className)}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'details',
    header: 'Qo\'shimcha',
    cell: ({ row }) => {
      const { isPartial, partNumber, totalParts } = row.original;
      return (
        <div className="flex items-center gap-3">
          {isPartial && (
            <Badge variant="secondary" className="text-xs">
              Qism {partNumber} / {totalParts}
            </Badge>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
