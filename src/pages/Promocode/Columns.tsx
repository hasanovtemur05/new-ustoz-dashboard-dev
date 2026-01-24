import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "components/DataTableRowActions";
import { DiscountEnum, IPromocode } from "modules/promocode/types";
import { formatDateTime } from "utils/formatDateTime";

interface IProps {
  getRowData: (course: IPromocode) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createVacancyColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<IPromocode, unknown>[] => [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "maxUses",
    header: "Umumiy miqdori",
  },
  {
    accessorKey: "minOrderValue",
    header: "Kamida qancha pul bolishi kerak ",
  },
  {
    accessorKey: "discountType",
    header: "Chegirma turi",
  },
  {
    accessorKey: "discountValue",
    header: "Chegirma(foiz yoki so'mda)",
    cell: ({ row }) => {
      const type = row.original.discountType;
      const value = row.original.discountValue;

      return (
        <> {type === DiscountEnum.PERCENT ? value + "%" : value +" " + "ming"} </>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: "Vaqt",
    cell: ({ row }) => {
      return (
        <span className="text-[12px]"> {formatDateTime(row.original.startDate) + " - "+ formatDateTime(row.original.endDate)} </span>
      );
    },
  },

  {
    accessorKey: "id",
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
          />
        </div>
      );
    },
  },
];
