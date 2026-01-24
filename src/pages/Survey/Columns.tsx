import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { ISurvey } from 'modules/survey/types';
import { CONTEXT_OPTIONS } from 'modules/survey/constants';

interface IProps {
  getRowData: (survey: ISurvey) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<ISurvey>[] => [
  {
    accessorKey: 'title',
    header: 'Sarlavha',
  },

  {
    accessorKey: 'question',
    header: 'Savol',
  },

  {
    accessorKey: 'context',
    header: 'Kontekst',
    cell: ({ row }) => {
      const context = row.getValue('context') as string;
      const contextOption = CONTEXT_OPTIONS.find(opt => opt.type === context);
      return contextOption?.name || context;
    },
  },

  {
    accessorKey: 'points',
    header: 'Ball',
    cell: ({ row }) => {
      const points = row.getValue('points') as number | undefined;
      return points ?? '-';
    },
  },

  {
    accessorKey: 'options',
    header: 'Variantlar',
    cell: ({ row }) => {
      const options = row.getValue('options') as string[] | undefined;
      return options?.length ? `${options.length} ta variant` : '-';
    },
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
  },
];
