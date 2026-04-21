import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createColumns } from './Columns';
import CustomForm from './CustomForm';
import ItemsForm from './ItemsForm';
import { useLessonRewardBoxes } from 'modules/lesson-reward-box/hooks/useList';
import { useDeleteBox } from 'modules/lesson-reward-box/hooks/useDelete';
import { ILessonRewardBox } from 'modules/lesson-reward-box/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import SearchSelectWithoutForm from 'components/fields/SearchSelectWithoutForm';
import { Button } from 'components/ui/button';
import { useSearchParams } from 'react-router-dom';

const LessonRewardBoxPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isItemsSheetOpen, setItemsSheetOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<ILessonRewardBox>();
  const [courses, setCourses] = useState<{ name: string; id: string }[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(searchParams.get('courseId') || '');

  const { data: coursesList } = useCoursesList();
  const { data: boxes, isLoading } = useLessonRewardBoxes(selectedCourseId);
  const { mutateAsync: deleteBox } = useDeleteBox(selectedCourseId);

  useEffect(() => {
    if (coursesList) {
      const mapped = coursesList.map((el) => ({ name: el.title, id: el.id }));
      setCourses(mapped);
      if (!selectedCourseId && mapped[0]) {
        setSelectedCourseId(mapped[0].id);
        setSearchParams({ courseId: mapped[0].id });
      }
    }
  }, [coursesList, selectedCourseId, setSearchParams]);

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    setSearchParams({ courseId: value });
  };

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <SearchSelectWithoutForm 
            data={courses} 
            placeholder="Kursni tanlang" 
            value={selectedCourseId}
            onChange={handleCourseChange} 
            className="w-[280px]"
          />
          <h2 className="font-bold text-2xl whitespace-nowrap">Dars Mukofoti Boxlar</h2>
        </div>

        <Button onClick={() => { setSelectedBox(undefined); setSheetOpen(true); }}>
          Box yaratish
        </Button>
      </div>

      {isLoading ? <Loader /> : <DataTable columns={columns} data={boxes || []} />}

      <Sheet 
        sheetTitle={selectedBox ? "Boxni tahrirlash" : "Yangi box yaratish"} 
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
