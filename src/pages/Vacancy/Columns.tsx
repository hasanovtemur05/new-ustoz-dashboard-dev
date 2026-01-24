import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Vacancy } from 'modules/vacancy/types';

interface IProps {
  getRowData: (course: Vacancy) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createVacancyColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Vacancy, unknown>[] => [
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'title',
    header: 'Ish nomi',
  },
  {
    accessorKey: 'type',
    header: 'Turi',
  },
  {
    accessorKey: 'description',
    header: 'Tarifi',
    cell: ({ row }) => (
      <div
        dangerouslySetInnerHTML={{
          __html: row.original.description?.length > 60 ? row.original.description.slice(0, 60) + '..' : row.original.description,
        }}
      />
    ),
  },


  {
    accessorKey: 'fromExperience',
    header: 'Tajriba',
    cell: ({ row }) => (
      <div>
        {row.getValue('fromExperience')} - {row.original.toExperience} yil
      </div>
    ),
  },

  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center ">
          <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} showAddTest={true} />
        </div>
      );
    },
  },
];
