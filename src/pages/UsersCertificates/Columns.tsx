import { ColumnDef } from '@tanstack/react-table';
import { IUserCertificate } from 'modules/user-certificate/types';
import { calculateAge } from 'utils/calculateAge';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  getRowData: (notification: IUserCertificate) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage }: IProps): ColumnDef<IUserCertificate>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'user',
    header: 'Talaba',
    cell: ({ row }) => {
      const profile = row.original.user;
      return <>{profile ? profile?.firstname + ' ' + profile?.lastname : ''}</>;
    },
  },
  {
    accessorKey: 'course',
    header: 'Kurs',
    cell: ({ row }) => <>{row.original?.course?.title} </>,
  },
  {
    accessorKey: 'user',
    header: 'Tel/Email',
    cell: ({ row }) => {
      const user = row.original.user;
      return <>{user?.phone ? user?.phone : user?.email}</>;
    },
  },
  {
    accessorKey: 'user',
    header: 'Yosh',
    cell: ({ row }) => {
      const age = calculateAge(row.original.user?.birthday || '');
      return <>{age || 'kiritilmagan'}</>;
    },
  },
  {
    accessorKey: 'adress',
    header: 'Manzil',
    cell: ({ row }) => <>{row.original?.user?.address?.region + ', ' + row.original?.user?.address?.district} </>,
  },

  {
    accessorKey: 'file',
    header: 'Sertifikat',
    cell: ({ row }) => (
      <a href={normalizeImgUrl(row.original?.file || '')} target="_blank" rel="noreferrer noopener" className="text-blue-700">
        File
      </a>
    ),
  },
];
