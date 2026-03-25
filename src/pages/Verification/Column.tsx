import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface ColumnsProps {
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '?';
};

export const createVerificationColumns = ({ onApprove, onReject }: ColumnsProps): ColumnDef<any>[] => [
  {
    accessorKey: 'id',
    header: 'T/r',
    cell: ({ row }) => <div className="w-10">{row.index + 1}</div>,
  },
  {
    id: 'photo',
    header: 'Rasm',
    cell: ({ row }) => {
      const user = row.original.user;
      const firstName = user?.firstname || '';
      const lastName = user?.lastname || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Noma\'lum';
      const initials = getInitials(firstName, lastName);

      return (
        <div className="size-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
          {user?.photo ? (
            <img src={user.photo} alt={fullName} className="size-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-muted-foreground">{initials}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'user',
    header: 'Foydalanuvchi',
    cell: ({ row }) => {
      const user = row.original.user;
      const firstName = user?.firstname || '';
      const lastName = user?.lastname || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Noma\'lum';

      return <span className="font-medium">{fullName}</span>;
    },
  },
  {
    accessorKey: 'region',
    header: 'Viloyat',
  },
  {
    accessorKey: 'district',
    header: 'Tuman',
  },
  {
    accessorKey: 'neighborhood',
    header: 'Mahalla',
  },
  {
    accessorKey: 'university',
    header: 'OTM',
    cell: ({ row }) => row.getValue('university') || '-',
  },
  {
    accessorKey: 'type',
    header: 'Turi',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className={
          status === 'APPROVED' ? 'text-green-500' :
            status === 'REJECTED' ? 'text-red-500' : 'text-yellow-500'
        }>
          {status}
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Sana',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      try {
        return format(new Date(date), 'dd.MM.yyyy HH:mm');
      } catch (e) {
        return date;
      }
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;
      if (item.status !== 'PENDING') return null;

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onApprove(item.id)}
            className="text-green-500 hover:text-green-600 hover:bg-green-50"
          >
            <Check className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReject(item.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
