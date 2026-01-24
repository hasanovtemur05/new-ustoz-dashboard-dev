import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz } from 'modules/lastexam/types';
import { useQuizzesList } from 'modules/lastexam/hooks/useQuizzesList';
import { useDeleteQuiz } from 'modules/lastexam/hooks/useDeleteQuiz';

import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import Loader from 'components/Loader';
import QuizForm from './QuizForm';
import { createQuizColumns } from './Columns';
import { Pagination } from 'components/Pagination';

const LastExam = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quiz, setQuiz] = useState<Quiz>();

  const { lessonId } = useParams();
  const { data: quizzesList, isLoading, paginationInfo } = useQuizzesList(lessonId!, currentPage);
  const { triggerQuizDelete } = useDeleteQuiz(quiz?.id!);

  const getRowData = (quiz: Quiz) => {
    setQuiz(quiz);
  };

  const columns = createQuizColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Yakuniy test qo'shish"
        sheetTitle="Yangi yakuniy test qo'shish."
        TableForm={QuizForm}
        // isAddButtonHidden={quizzesList.length >= 5}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={quizzesList} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={paginationInfo} />
        </>
      )}

      <Sheet sheetTitle="Yangi test yaratish" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <QuizForm quiz={quiz} setSheetOpen={setSheetOpen} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerQuizDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default LastExam;
