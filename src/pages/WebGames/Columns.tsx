import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { CheckCircle, XCircle } from 'lucide-react';
import { IUserCertificate } from 'modules/user-certificate/types';
import { Link } from 'react-router-dom';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IUserCertificateWithLogo extends IUserCertificate {
    logo?: string;
}

interface IProps {
    getRowData: (notification: IUserCertificate) => void;
    setSheetOpen: (state: boolean) => void;
    setDialogOpen: (state: boolean) => void;

}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, }: IProps): ColumnDef<IUserCertificateWithLogo>[] => [
    {
        accessorKey: 'amount',
        header: 'T/R',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Nomi',
    },
    {
        accessorKey: 'description',
        header: 'Tavsif',
    },
    {
        accessorKey: 'link',
        header: 'Link',
        cell: ({ row }) => {
            const link = row.getValue<string>('link');

            if (!link) return '—';

            return (
                <Link
                    to={link}
                    className="text-blue-600 hover:underline"
                >
                    O‘tish
                </Link>
            );
        },
    },
    {
        accessorKey: 'isActive',
        header: 'Faol',
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('isActive');

            return isActive ? (
                <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
                <XCircle className="text-red-500 w-5 h-5" />
            );
        },
    },
    {
        accessorKey: 'logo',
        header: 'Logo',
        cell: ({ row }) => {
            const logo = row.original?.logo;

            return logo ? (
                <img
                    src={normalizeImgUrl(logo)}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    Logo
                </div>
            );
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
