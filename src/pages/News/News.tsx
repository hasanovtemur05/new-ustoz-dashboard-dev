import { useState } from 'react';
import { News } from 'modules/news/types';
import { useNewsList } from 'modules/news/hooks/useNewsList';
import { useDeleteNews } from 'modules/news/hooks/useDeleteNews';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import NewsForm from './NewsForm';
import { createNewsColumns } from './Columns';

const NewsPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [news, setNews] = useState<News>();
  const [currentPage] = useState(1);

  const {
    data: newsList,
    // paginationInfo,
    isLoading,
  } = useNewsList(currentPage);
  const { triggerNewsDelete } = useDeleteNews(news?.id!);

  const getRowData = (news: News) => {
    setNews(news);
  };

  const columns = createNewsColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Yangilik qo'shish"
        sheetTitle="Yangilik qo'shish."
        TableForm={NewsForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={newsList} />
          {/* <Pagination
            className="justify-end mt-3"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={paginationInfo}
          /> */}
        </>
      )}

      <Sheet
        sheetTitle="Yangilikni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <NewsForm news={news} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerNewsDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default NewsPage;
