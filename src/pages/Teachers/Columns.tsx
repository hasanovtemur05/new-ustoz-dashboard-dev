import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "components/DataTableRowActions";
import { TeacherType } from "modules/teachers/types";
import { baseMediaUrl } from "services/api";

interface IProps {
  getRowData: (notification: TeacherType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<TeacherType>[] => [
  {
    accessorKey: "fullname",
    header: "Ism",
  },

  {
    accessorKey: "photo",
    header: "Rasm",
    cell: ({ row }) => {
      return (
        <img
          src={`${baseMediaUrl}/${row.getValue("photo")}`}
          alt="img"
          width={80}
          height={60}
          style={{
            objectFit: "cover",
            maxHeight: "60px",
          }}
          loading="lazy"
        />
      );
    },
  },

  {
    accessorKey: "id",
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
