import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { BookOpen } from 'lucide-react';
import { Pagination } from 'components/Pagination';
import { useCourseRewardList } from 'modules/add-reward-to-lessons/hooks/useList';
import { useDeleteCourseReward } from 'modules/add-reward-to-lessons/hooks/useDelete';
import { ICourseReward } from 'modules/add-reward-to-lessons/types';
import { Button } from 'components/ui/button';
import { useSearchParams } from 'react-router-dom';

const AddRewardToLessons = () => {
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<ICourseReward>();
  const [currentPage, setCurrentPage] = useState(1);
  const courseId = searchParams.get('courseId') || '';

  const isCourseNotSelected = !courseId || courseId === 'unassigned';
  const { data: couseAssitants, isLoading, isError, paginationInfo } = useCourseRewardList(currentPage, isCourseNotSelected ? '' : courseId);

  const { triggerInfoDelete } = useDeleteCourseReward(data?.id!);
  const getRowData = (info: ICourseReward) => {
    setData(info);
    // if (info.id) {
    //   setSearchParams((prev) => {
    //     const newParams = new URLSearchParams(prev);
    //     newParams.set('lessonId', info.id);
    //     return newParams;
    //   });
    // }
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });



  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-2xl whitespace-nowrap text-slate-800 dark:text-slate-100">
          Dars sovg'alari
        </h2>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setData(undefined);
              setSheetOpen(true);
            }}
          >
            Darsga sovg'a biriktirish
          </Button>
        </div>
      </div>
      {isCourseNotSelected ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-semibold text-xl">
            Ma'lumotlarni ko'rish uchun kursni tanlang
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs text-center">
            Ushbu bo'limdagi ma'lumotlarni ko'rish uchun yuqoridagi ro'yxatdan bitta kursni tanlashingiz lozim.
          </p>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Ma'lumotlarni yuklashda xatolik yuz berdi. 
          </p>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={couseAssitants || []} />
          {paginationInfo && (
            <Pagination
              className="justify-end mt-3"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginationInfo={paginationInfo}
            />
          )}
        </>
      )}

      <Sheet sheetTitle={data ? "Dars sovg'asini  tahrirlash" : "Dars sovg'asini qo'shish"} isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm selectedData={data} setSheetOpen={setSheetOpen} />
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerInfoDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default AddRewardToLessons;
