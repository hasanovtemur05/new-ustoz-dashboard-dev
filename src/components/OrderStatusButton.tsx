import { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DonationStatus, IOrder } from 'modules/orders/types';
import { useEditOrder } from 'modules/orders/hooks/useEdit';
import { useCancelOrder } from 'modules/orders/hooks/useCancel';

interface IProps {
  row: Row<IOrder>;
  getRowData: (data: IOrder) => void;
}

interface PremiumInputType {
  status: 'pending' | 'done';
  [key: string]: any;
}

export const OrderStatusButton = ({ row, getRowData }: IProps) => {
  const { mutate, isPending } = useEditOrder();
  const { triggerCencelOrder } = useCancelOrder(row.original.id);

  // Statusni yangilash funksiyasi
  const handleStatusChange = (status: DonationStatus) => {
    const order = row.original;
    mutate({ status, id: order.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {row.original.status == DonationStatus.PENDING ? (
          <button className={`flex items-center px-3 py-1 text-sm font-medium  rounded-lg text-yellow-700 bg-yellow-200`}>
            Pending
            <EllipsisVertical className="h-4 w-4 stroke-1" />
          </button>
        ) : row.original.status == DonationStatus.DONE ? (
          <button className={`flex items-center px-3 py-1 text-sm font-medium  rounded-lg text-white bg-green-500 `}>
            Done
            <EllipsisVertical className="h-4 w-4 stroke-1" />
          </button>
        ) : row.original.status == DonationStatus.CANCELED ? (
          <button className={`flex items-center px-3 py-1 text-sm font-medium  rounded-lg text-white bg-red-500 `}>
            Canceled
            <EllipsisVertical className="h-4 w-4 stroke-1" />
          </button>
        ) : (
          <EllipsisVertical className="h-4 w-4 stroke-1" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(DonationStatus.PENDING);
          }}
          disabled={isPending}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-green-500 focus:text-green-600 dark:focus:text-green-600"
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(DonationStatus.DONE);
          }}
          disabled={isPending}
        >
          Done
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-500 focus:text-red-600 dark:focus:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            triggerCencelOrder();
          }}
          disabled={isPending}
        >
          Bekor qilish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
