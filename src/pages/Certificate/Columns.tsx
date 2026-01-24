import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "components/DataTableRowActions";
import { CertificateType, RecommendationType, RecEnum } from "modules/certificate/types";
import { Link } from "react-router-dom";
import normalizeImgUrl from "utils/normalizeFileUrl";

// Union type for table rows
export type TableRowType = CertificateType | RecommendationType;

interface IProps {
  getRowData: (row: TableRowType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

// Mapping for recommendation type to uzbek label
const typeLabelMap: Record<RecEnum, string> = {
  [RecEnum.AMATEUR]: "Havaskor",
  [RecEnum.PROGRESSIVE]: "Rivojlanayotgan",
};

// Mapping for certificate degree to uzbek label
const degreeLabelMap: Record<string, string> = {
  GOLD: "Oltin",
  SILVER: "Kumush",
  BRONZE: "Bronza",
};

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<TableRowType>[] => [
  {
    id: "photo",
    accessorFn: (row) => row.photo,
    header: "Icon",
    cell: ({ row }) => (
      <Link
        to={normalizeImgUrl(row.getValue("photo") as string)}
        className="text-blue-600"
        target="_blank"
        rel="noreferrer noopener"
      >
        file
      </Link>
    ),
  },

  {
    id: "degreeOrType",
    accessorFn: (row) =>
      "degree" in row
        ? degreeLabelMap[row.degree] || row.degree
        : typeLabelMap[row.type as RecEnum] || row.type,
    header: "Daraja / Tur",
  },

  {
    id: "course",
    accessorFn: (row) => {
      if ("course" in row) {
        if (typeof row.course === "string") return row.course;
        return row.course.title;
      }
      return "";
    },
    header: "Kurs",
  },

  {
    id: "actions",
    accessorFn: (row) => row.id,
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
