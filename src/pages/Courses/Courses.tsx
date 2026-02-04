'use client';

import { useState } from 'react';
import type { Course } from 'modules/courses/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useDeleteCourse } from 'modules/courses/hooks/useDeleteCourse';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import CourseForm from './CourseForm';
import { createCourseColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { useEditCourse } from 'modules/courses/hooks/useEditCourse';

const Courses = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [course, setCourse] = useState<Course>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: coursesList, isLoading, paginationInfo } = useCoursesList({ currentPage });

  
  
  const { triggerCourseEdit } = useEditCourse({
    id: course?.id,
    setSheetOpen,
  });

  const toggleActive = (isActive: boolean) => {
    triggerCourseEdit({ isActive });
  };

  const { triggerCourseDelete } = useDeleteCourse(course?.id!);

  const getRowData = (course: Course) => {
    setCourse(course);
  };

  
  

  const columns = createCourseColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
    currentPage,
    toggleActive,
  });

  return (
    <div>
      <TableActions sheetTriggerTitle="Kurs qo'shish" sheetTitle="Yangi kurs qo'shish." TableForm={CourseForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={coursesList}
            navigateTable
            customNavigationUrl={(row) => {
              const baseUrl = `/courses/${row.id}`;
              const params = new URLSearchParams();
              params.append('type', row.pricingType);
              return `${baseUrl}?${params.toString()}`;
            }}
          />
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

      <Sheet sheetTitle="Kursni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CourseForm course={course} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerCourseDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Courses;
