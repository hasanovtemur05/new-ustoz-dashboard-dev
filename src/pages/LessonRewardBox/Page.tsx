import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createColumns } from './Columns';
import CustomForm from './CustomForm';
import ItemsForm from './ItemsForm';
import { Package } from 'lucide-react';
import { useLessonRewardBoxes } from 'modules/lesson-reward-box/hooks/useList';
import { useDeleteBox } from 'modules/lesson-reward-box/hooks/useDelete';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { Button } from 'components/ui/button';
import { useSearchParams } from 'react-router-dom';

const LessonRewardBoxPage = () => {
  const [searchParams] = useSearchParams();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isItemsSheetOpen, setItemsSheetOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<ILessonRewardBox>();
  const selectedCourseId = searchParams.get('courseId') || '';
  const isCourseNotSelected = !selectedCourseId || selectedCourseId === 'unassigned';

  const { data: boxes, isLoading, isError } = useLessonRewardBoxes(isCourseNotSelected ? '' : selectedCourseId);
  const { mutateAsync: deleteBox } = useDeleteBox(selectedCourseId);

  const columns = createColumns({
    onEdit: (box) => {
      setSelectedBox(box);
      setSheetOpen(true);
    },
    onManageItems: (box) => {
      setSelectedBox(box);
      setItemsSheetOpen(true);
    },
    onDelete: (id) => {
      setSelectedBox(boxes?.find(b => b.id === id));
      setDeleteDialogOpen(true);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-2xl whitespace-nowrap text-slate-800 dark:text-slate-100">
          Kurs uchun Kombo sovg'alar
        </h2>

        <div className="flex items-center gap-2">
          <Button onClick={() => { setSelectedBox(undefined); setSheetOpen(true); }}>
            Kombo sovg'a qo'shish
          </Button>
        </div>
      </div>

      {isCourseNotSelected ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-semibold text-xl">
            Boxlarni ko'rish uchun kursni tanlang
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs text-center">
            Ushbu bo'limdagi boxlarni ko'rish uchun yuqoridagi ro'yxatdan bitta kursni tanlashingiz lozim.
          </p>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Box ma'lumotlarini yuklashda xatolik yuz berdi. 
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={boxes || []} />
      )}

      <Sheet 
        sheetTitle={selectedBox ? "Kombo sovg'ani tahrirlash" : "Kurs uchun Kombo sovg'alar yaratish"} 
        isOpen={isSheetOpen} 
        setSheetOpen={setSheetOpen}
      >
        <CustomForm box={selectedBox} setSheetOpen={setSheetOpen} courseId={selectedCourseId} />
      </Sheet>

      <Sheet 
        sheetTitle={`"${selectedBox?.title}" - Mukofotlarni boshqarish`} 
        isOpen={isItemsSheetOpen} 
        setSheetOpen={setItemsSheetOpen}
      >
        {selectedBox && <ItemsForm box={selectedBox} />}
      </Sheet>

      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Ushbu box va uning ichidagi barcha mukofotlar o'chiriladi."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={() => selectedBox && deleteBox(selectedBox.id)}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
      />
    </div>
  );
};

export default LessonRewardBoxPage;
