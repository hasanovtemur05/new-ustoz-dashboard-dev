import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { useOredersList } from 'modules/orders/hooks/useList';
import { IOrder, OrderType, DonationStatus, OrdersCreateType } from 'modules/orders/types';

import { AlertDialog } from 'components/AlertDialog';
import { useDeleteOrder } from 'modules/orders/hooks/useDelete';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'components/ui/sheet';
import OrdersForm from './OrdersForm'; 

const typeData = [
  { id: OrderType.ACTIVE, name: 'Faolar' },
  { id: OrderType.ALL, name: 'Barchasi' },
  { id: OrderType.DELETED, name: "O'chirilgan" },
];

const statusData = [
  { id: 'ALL_STATUS', name: 'Barchasi' },
  { id: DonationStatus.PENDING, name: 'Kutilmoqda' },
  { id: DonationStatus.DONE, name: 'Bajarildi' },
  { id: DonationStatus.CANCELED, name: 'Bekor qilindi' },
];

const OrdersPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IOrder>();
  const [orderType, setOrderType] = useState<string>(OrderType.ACTIVE);
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<string>('ALL_STATUS');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<OrdersCreateType | null>(null);

  const [searchFilters, setSearchFilters] = useState({
    status: 'ALL_STATUS',
    firstname: '',
    lastname: '',
    phone: '',
  });

  const filters = {
    type: orderType,
    status: searchFilters.status !== 'ALL_STATUS' ? searchFilters.status : undefined,
    firstname: searchFilters.firstname || undefined,
    lastname: searchFilters.lastname || undefined,
    phone: searchFilters.phone || undefined,
  };

  const { data: orders, isLoading, pagenationInfo } = useOredersList(currentPage, filters);

  console.log(orders, 'order list');
  

  const handleSearch = () => {
    setSearchFilters({
      status,
      firstname,
      lastname,
      phone,
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setStatus('ALL_STATUS');
    setFirstname('');
    setLastname('');
    setPhone('');
    setSearchFilters({
      status: 'ALL_STATUS',
      firstname: '',
      lastname: '',
      phone: '',
    });
    setCurrentPage(1);
  };

  const { triggerOrderDelete } = useDeleteOrder(data?.id!);
  const getRowData = (info: IOrder) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
    currentPage,
  });

   const handleSheetClose = () => {
    setSheetOpen(false);
    setSelectedRow(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Jami {pagenationInfo?.count || 0} ta </h2>
        <h1 className="text-2xl font-bold">Buyurtmalar</h1>
      </div>

      <div className="mb-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Turi</label>
            <SelectWithoutForm data={typeData} placeholder="Turi bo'yicha..." onChange={(value) => setOrderType(value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <SelectWithoutForm data={statusData} placeholder="Status bo'yicha..." onChange={(value) => setStatus(value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Ism</label>
            <Input placeholder="Ism..." value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Familiya</label>
            <Input placeholder="Familiya..." value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Telefon</label>
            <Input placeholder="Telefon..." value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSearch}>Qidirish</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Tozalash
          </Button>
        </div>
      </div>

       <div className='flex justify-between  p-4'>
        <h1 className="text-2xl font-bold">Sotib olganlar</h1>
        <Button onClick={() => setSheetOpen(true)}>Kursni aktivlashtirish</Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={orders} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}

      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedRow ? 'Tahrirlash' : 'Aktivlashtirish'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <OrdersForm
              setSheetOpen={setSheetOpen}
            />
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi? "
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerOrderDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default OrdersPage;
