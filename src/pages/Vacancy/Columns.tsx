import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Vacancy, VacancyType } from 'modules/vacancy/types';

interface IProps {
  getRowData: (course: Vacancy) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

const experienceTranslations: Record<string, string> = {
  "NO_EXPERIENCE": "Tajriba shart emas",
  "ONE_TO_THREE_YEARS": "1 yildan 3 yilgacha",
  "THREE_TO_SIX_YEARS": "3 yildan 6 yilgacha",
  "SIX_PLUS_YEARS": "6 yildan ko'p",
};

const workScheduleTranslations: Record<string, string> = {
  "FULL_TIME": "To'liq kun",
  "PART_TIME": "Yarim stavka",
  "REMOTE": "Masofaviy",
};

export const createVacancyColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<Vacancy, unknown>[] => [
  {
    accessorKey: 'company',
    header: 'Kompaniya',
  },
  {
    accessorKey: 'title',
    header: 'Ish nomi',
  },
  {
    accessorKey: 'specialization',
    header: 'Mutaxassislik',
  },
  {
    accessorKey: 'address',
    header: 'Manzil',
    cell: ({ row }) => {
      const address = row.original.address;
      return address ? `${address.region}, ${address.district}` : "—";
    }
  },
  {
    accessorKey: 'salary',
    header: 'Oylik',
    cell: ({ row }) => (
      <div className="font-medium text-green-600">
        {row.original.salaryFrom.toLocaleString()} - {row.original.salaryTo.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'workSchedule',
    header: 'Ish vaqti',
    cell: ({ row }) => workScheduleTranslations[row.original.workSchedule] || row.original.workSchedule || "—",
  },
  {
    accessorKey: 'experience',
    header: 'Tajriba',
    cell: ({ row }) => experienceTranslations[row.original.experience] || row.original.experience || "—",
  },
  {
    accessorKey: 'description',
    header: 'Tarifi',
    cell: ({ row }) => {
      const description = row.original.description || "";
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: description.length > 30 ? description.slice(0, 30) + '..' : description,
          }}
        />
      );
    },
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
