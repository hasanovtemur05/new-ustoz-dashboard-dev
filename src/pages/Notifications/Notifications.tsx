import { useState } from 'react';
import { Notification } from 'modules/notifications/types';
import { useNotificationsList } from 'modules/notifications/hooks/useNotificationsList';
import { useDeleteNotification } from 'modules/notifications/hooks/useDeleteNotification';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createNotificationColumns } from './Columns';
import NotificationForm from './NotificationForm';
import { Pagination } from 'components/Pagination';
import { createStatisticsNotificationColumns } from './StatisticsColumn';
import { Button } from 'components/ui/button';
import { useNotificationsStatisticList } from 'modules/notifications/hooks/useNotificationsStatisticList';

const Notifications = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [notification, setNotification] = useState<Notification>();
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatistic, setOpenStatistic] = useState(false);

  const { data: notificationsList, isLoading, pagenationInfo } = useNotificationsList(currentPage, 10, !openStatistic);
  const {
    data: notificationsStatisticList,
    isLoading: isLoadingStat,
    pagenationInfo: pagenationInfoStat,
  } = useNotificationsStatisticList(currentPage, 10,openStatistic);
  const { triggerNotificationDelete } = useDeleteNotification(notification?.id!);

  const getRowData = (notification: Notification) => {
    setNotification(notification);
  };

  const columns = createNotificationColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  const statisticColumns = createStatisticsNotificationColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions sheetTriggerTitle="Bildirishnoma qo'shish" sheetTitle="Yangi bildirishnoma qo'shish" TableForm={NotificationForm}>
        {/* <SelectWithoutForm data={typeData} placeholder="Kursni  bo'yicha..." onChange={(value) => setCourse(value)} /> */}
        <Button onClick={() => setOpenStatistic(!openStatistic)}>{openStatistic ? 'Bildirishnomalarga qaytish' : 'Statistikani korish'}</Button>
      </TableActions>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {openStatistic ? (
            <DataTable columns={statisticColumns} data={notificationsStatisticList} />
          ) : (
            <DataTable columns={columns} data={notificationsList} />
          )}
          <Pagination
            className="justify-end mt-3"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={openStatistic ? pagenationInfoStat : pagenationInfo}
          />
        </>
      )}

      <Sheet sheetTitle="Kursni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <NotificationForm notification={notification} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerNotificationDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Notifications;
