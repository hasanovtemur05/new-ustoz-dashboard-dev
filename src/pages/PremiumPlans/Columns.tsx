import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import CustomSwitch from 'components/SwitchIsDreft';
import { PremiumPlan } from 'modules/premium-plan/types';

interface IProps {
  getRowData: (notification: PremiumPlan) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<PremiumPlan>[] => [
  
    {
      accessorKey: 'title',
      header: 'Tarif nomi',
    },
    {
      accessorKey: 'price',
      header: 'Narxi',
    },
    {
      accessorKey: 'durationInDays',
      header: 'Davomiyligi',
    },
    {
      accessorKey: 'isVisible',
      header: 'Status',
      cell: ({ row }) => {
        const isVisible: boolean = row.getValue('isVisible') || false
        return <>
          <CustomSwitch state={isVisible}
            labelText={isVisible ? "Ko'rinadigan" : "Ko'rinmaydigan "} />
        </>;
      },
    },

    {
      accessorKey: 'id',
      header: () => <span className="sr-only">Actions</span>,
      size: 50,
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          getRowData={getRowData}
          setDialogOpen={setDialogOpen}
          setSheetOpen={setSheetOpen}
        />
      ),
    },
  ];
