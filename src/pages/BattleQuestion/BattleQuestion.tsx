import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import Loader from 'components/Loader';
import QuizForm from './QuizForm';
import { createQuizColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { BattleQuiz } from 'modules/battle-question/types';
import { useDeleteBattleQuiz } from 'modules/battle-question/hooks/useDeleteQuiz';
import { useBattleQuizzesList } from 'modules/battle-question/hooks/useQuizzesList';

const BattleQuestionPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quiz, setQuiz] = useState<BattleQuiz>();

  const { lessonId } = useParams();
  const { data: quizzesList, isLoading, paginationInfo } = useBattleQuizzesList(lessonId!, currentPage);
  const { triggerQuizDelete } = useDeleteBattleQuiz(quiz?.id!);

  const getRowData = (quiz: BattleQuiz) => {
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
        sheetTriggerTitle="Battle test qo'shish"
        sheetTitle="Yangi battle test qo'shish."
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

      <Sheet sheetTitle="Yangi battle test yaratish" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
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

export default BattleQuestionPage;
