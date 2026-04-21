import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { IHolidaysTypes } from 'modules/holidays/types';
import { baseMediaUrl } from 'services/api';

interface IProps {
    getRowData: (notification: IHolidaysTypes) => void;
    setSheetOpen: (state: boolean) => void;
    setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen }: IProps): ColumnDef<IHolidaysTypes>[] => [
    {
        accessorKey: 'photo',
        header: 'Rasm',
        cell: ({ row }) => {
            const photo = row.original.photo;
            
            // Agar rasm bo'sh bo'lsa
            if (!photo) {
                return <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">No image</div>;
            }

            // Agar to'liq URL bo'lsa
            let photoUrl = photo;
            if (!photo.startsWith('http')) {
                photoUrl = `${baseMediaUrl}/${photo}`;
            }

            return (
                <a href={photoUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <img 
                        src={photoUrl} 
                        alt="Holiday" 
                        className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect width="48" height="48" fill="%23f0f0f0"/%3E%3C/svg%3E';
                        }}
                    />
                </a>
            );
        },
    },
    {
        accessorKey: 'translations',
        header: 'Nomi',
        cell: ({ row }) => {
            const translation = row.original.translations?.find((t) => t.language === 'uz');
            return translation ? translation.name : 'Nomi yo\'q';
        },
    },
    {
        accessorKey: 'region',
        header: 'Hudud',
    },
    {
        accessorKey: 'day',
        header: 'Kun',
    },
    {
        accessorKey: 'month',
        header: 'Oy',
    },
   {
    accessorKey: 'createdAt',
    header: 'Yaratilgan vaqti',
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // oy 0 dan boshlanadi
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    },
},
{
    accessorKey: 'updatedAt',
    header: 'O\'zgartirilgan vaqti',
    cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    },
},


    {
        accessorKey: 'id',
        header: () => <span className="sr-only">Actions</span>,
        size: 50,
        cell: ({ row }) => <DataTableRowActions row={row} getRowData={getRowData} setDialogOpen={setDialogOpen} setSheetOpen={setSheetOpen} />,
    },
];
