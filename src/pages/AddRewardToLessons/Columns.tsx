import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { ICourseReward } from 'modules/add-reward-to-lessons/types';
import { Badge } from 'components/ui/badge';
import { getMediaUrl } from 'utils/common';
import { cn } from 'utils/styleUtils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'components/ui/dialog';

interface IProps {
  getRowData: (notification: ICourseReward) => void;
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
  'COIN': { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  'PRODUCT': { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  'PROMOCODE': { label: 'Promokod', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  'FILE': { label: 'Kitob', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' },
  'AMATEUR_CERTIFICATE': { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  'PROGRESSIVE_CERTIFICATE': { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<ICourseReward>[] => [
  {
    id: 'index',
    header: '№',
    size: 50,
    cell: ({ row }) => (
      <span className="text-slate-500 font-medium">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'orderId',
    header: 'Dars raqami',
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'Dars nomi',
    cell: ({ row }) => renderWithTooltip(row.original.title, 30),
  },
  {
    accessorKey: 'rewardPhoto',
    header: 'Rasm',
    size: 100,
    cell: ({ row }) => {
      const photo = row.original.rewardPhoto;
      if (!photo) return <span className="text-slate-300 text-[10px]">no photo</span>;
      const imageUrl = getMediaUrl(photo);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-center cursor-pointer group relative w-16 h-10">
              <img 
                src={imageUrl} 
                alt="reward" 
                className="w-16 h-10 object-cover rounded shadow-sm border border-slate-100 transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-[8px] font-bold">KO'RISH</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-transparent border-none shadow-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt="reward large" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'reward',
    header: 'Sovg\'a',
    cell: ({ row }) => renderWithTooltip(row.original.reward, 20),
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
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none">
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
