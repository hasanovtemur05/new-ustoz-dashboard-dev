import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { Pagination } from 'components/Pagination';
import { useCourseRewardList } from 'modules/add-reward-to-lessons/hooks/useList';
import { useDeleteCourseReward } from 'modules/add-reward-to-lessons/hooks/useDelete';
import { ICourseReward } from 'modules/add-reward-to-lessons/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import { Button } from 'components/ui/button';
import { CustomSelectType } from 'pages/UsersCertificates/Page';
import { useSearchParams } from 'react-router-dom';

const AddRewardToLessons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<ICourseReward>();
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<CustomSelectType[]>([]);
  const [course, setCourse] = useState<CustomSelectType>();

  const { data: coursesList } = useCoursesList();
  const { data: couseAssitants, isLoading, paginationInfo } = useCourseRewardList(currentPage, `${course?.id}`);

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

  useEffect(() => {
    let newArr: CustomSelectType[] = [];
    if (coursesList) {
      coursesList.forEach((el) =>
        newArr.push({
          name: el.title,
          id: el.id,
        })
      );
      setCourses(newArr);
      setCourse(newArr[0]);
      setSearchParams({ courseId: newArr[0] ? `${newArr[0]?.id}` : '' });
    }
  }, [coursesList]);


  const handleCourseChange = (value: string) => {
    const selectedCourse = courses.find((c) => c.id === value);
    setCourse(selectedCourse);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('courseId', value);
      return newParams;
    });

    // Sahifani birinchiga qaytarish
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <SelectWithoutForm data={courses} placeholder="Kursni  bo'yicha..." onChange={handleCourseChange} />
        </div>
        {course && <h2 className="font-bold text-2xl"> {course?.name} sovg'alari </h2>}

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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={couseAssitants} />
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
