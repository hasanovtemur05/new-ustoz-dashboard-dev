import { useState } from 'react';
import { useBooksList } from 'modules/books/hooks/useBooksList';
import { useDeleteBook } from 'modules/books/hooks/useDeleteBook';
import { Book } from 'modules/books/types';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { TableActions } from 'components/TableActions';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { Pagination } from 'components/Pagination';

const BooksPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [currentPage, setCurrentPage] = useState(1); // <-- qo'shildi

  const { data: booksListRaw, paginationInfo, isLoading } = useBooksList(currentPage, 20); // <-- paginationInfo olindi

  const booksList = booksListRaw?.map(book => ({
    ...book,
    pageCount: book.pagesCount,
  }));

  console.log(booksList, "kitoblar ruyxati");

  const { triggerBookDelete } = useDeleteBook(selectedBook?.id ?? '');

  const getRowData = (book: Book) => {
    setSelectedBook(book);
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  const handleSheetClose = (state: boolean) => {
    setSheetOpen(state);
    if (!state) setSelectedBook(undefined);
  };

  return (
    <div className="p-4">
      <TableActions
        sheetTriggerTitle="Kitob qo'shish"
        sheetTitle="Yangi Kitob qo'shish"
        TableForm={CustomForm}  
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={booksList ?? []} />
          <Pagination
            className="justify-end mt-3"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginationInfo={paginationInfo} 
          />
        </>
      )}

      <Sheet
        sheetTitle="Kitobni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={handleSheetClose}
      >
        <CustomForm book={selectedBook} setSheetOpen={handleSheetClose} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerBookDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default BooksPage;