import type { ColumnDef } from '@tanstack/react-table';
import type { Course } from 'modules/courses/types';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { Link } from 'react-router-dom';
import { Badge } from 'components/ui/badge';
import CustomSwitch from 'components/SwitchIsDreft';

interface IProps {
  getRowData: (course: Course) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
  toggleActive: (isActive: boolean) => void;
}

export const createCourseColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage, toggleActive }: IProps): ColumnDef<Course, unknown>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'title',
    header: 'Kurs nomi',
  },
  // {
  //   accessorKey: 'description',
  //   header: 'Davomiyligi',
  //   cell: ({ row }) => {
  //     const rawHtml: string = row.getValue('description');
  //     const plainText = stripHtml(rawHtml);
  //     const truncatedText = truncateText(plainText, 70);

  //     return <div title={plainText}>{truncatedText}</div>;
  //   },
  // },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('isActive') || false;
      return (
        <>
          <CustomSwitch state={isActive} labelText={isActive ? "Ko'rinadigan" : "Ko'rinmaydigan "}     />
        </>
      );
    },
  },
  {
    accessorKey: 'pricingType',
    header: 'Narx turi',
    cell: ({ row }) => {
      const pricingType = row.getValue('pricingType') as string;
      return (
        <Badge variant={pricingType === 'PAID' ? 'default' : 'secondary'}>
          {pricingType === 'PAID' ? 'PRO' : pricingType === 'TOURISM' ? 'Turizm' : 'BEPUL'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Turi',
    cell: ({ row }) => {
      const pricingType = row.original.pricingType;
      const type = row.getValue('type');
      return pricingType === 'FREE' ? type : '-';
    },
  },
  {
    accessorKey: 'planLessonCount',
    header: 'Rejalashtirilgan dars soni',
    cell: ({ row }) => {
      const pricingType = row.original.pricingType;
      const planLessonCount = row.getValue('planLessonCount');
      return pricingType === 'FREE' ? planLessonCount : '-';
    },
  },
  {
    accessorKey: 'price',
    header: 'Narxi',
    cell: ({ row }) => {
      const pricingType = row.original.pricingType;
      const price = row.original.price;
      return pricingType === 'PAID' && price ? `${price.toLocaleString()} so'm` : '-';
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center ">
          <DataTableRowActions
            row={row}
            getRowData={getRowData}
            setDialogOpen={setDialogOpen}
            setSheetOpen={setSheetOpen}
            showAddTest={true}
            addTestEl={<Link to={`/exam/${row.getValue('id')}`}>Yakuniy test qo'shish</Link>}
            showBattle={true}
            addBattleEl={<Link to={`/battle-question/${row.getValue('id')}`}>Battle test qo'shish</Link>}
          />
        </div>
      );
    },
  },
];