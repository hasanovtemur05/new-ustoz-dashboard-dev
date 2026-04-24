import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { FortunaProduct, FortunaProductType } from 'modules/fortuna-product/types';
import { Badge } from 'components/ui/badge';
import { cn } from 'utils/styleUtils';

const typeMap: Record<string, { label: string; className: string }> = {
  [FortunaProductType.COIN]: { label: 'Coin', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' },
  [FortunaProductType.PRODUCT]: { label: 'Mahsulot', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
  [FortunaProductType.PROMOCODE]: { label: 'Promocode', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' },
  [FortunaProductType.EMPTY]: { label: "Bo'sh", className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  [FortunaProductType.AMATEUR_CERTIFICATE]: { label: 'Havaskor Sertifikat', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800' },
  [FortunaProductType.PROGRESSIVE_CERTIFICATE]: { label: 'Yuksaluvchi Sertifikat', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' },
};

interface IProps {
  getRowData: (notification: FortunaProduct) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<FortunaProduct>[] => [
  {
    accessorKey: 'title',
    header: 'Nomi',
  },
  {
    accessorKey: 'probability',
    header: 'Tushish extimoligi',
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
    accessorKey: 'isActive',
    header: 'Kategoryiya',
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('isActive') || false;
      return (
        <>
          <CustomSwitch state={isActive} labelText={isActive ? "Ko'rinadigan" : "Ko'rinmaydigan "} />
        </>
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
