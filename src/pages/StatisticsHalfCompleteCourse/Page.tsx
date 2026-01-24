import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { useUserCertificateList } from 'modules/user-certificate/hooks/useList';
import { IUserCertificate } from 'modules/user-certificate/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import regions from '../../db/regions.json';
import districtData from '../../db/districts.json';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import { useUserByHalfCourse } from 'modules/statistic-half-complete-course/hooks/useList';
import { IUserHalfCompleteCourse } from 'modules/statistic-half-complete-course/types';
import { DateRange } from 'react-day-picker';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { DateRangePicker } from 'components/DataRangePicker';

export type CustomSelectType = { name: string; id: string | number; disabled?: boolean; [key: string]: any };

const UsersHalfComplitedCoursesPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IUserHalfCompleteCourse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [course, setCourse] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [districts, setDistricts] = useState<CustomSelectType[]>([]);
  const [courses, setCourses] = useState<CustomSelectType[]>([]);

  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();

  const { data: categories, isLoading, pagenationInfo } = useUserByHalfCourse(currentPage, course, region, district, validDate);
  const { data: coursesList } = useCoursesList({ isEnabled: !!categories });

  const getRowData = (info: IUserHalfCompleteCourse) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
    currentPage,
  });

  useEffect(() => {
    let newArr: CustomSelectType[] = [];
    coursesList.forEach((el) =>
      newArr.push({
        name: el.title,
        id: el.id,
      })
    );
    setCourses(newArr);
  }, [coursesList]);

  useEffect(() => {
    if (region) {
      const filtered = districtData.filter((c) => c.region_name === region);
      setDistricts(filtered);
    }
  }, [region]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">Dars yarmiga kelgan talabalar</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2>Jami {pagenationInfo?.count || 0} ta </h2>
          <SelectWithoutForm data={courses} placeholder="Kursni  bo'yicha..." onChange={(value) => setCourse(value)} />
          <SelectWithoutForm data={regions} placeholder="Viloyatlar  bo'yicha..." onChange={(value) => setRegion(value)} isTitleKey={true} />
          <SelectWithoutForm
            data={districts}
            placeholder="Tuman/shahar bo'yicha..."
            onChange={(value) => setDistrict(value)}
            isTitleKey={true}
          />
          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={categories} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}
    </div>
  );
};

export default UsersHalfComplitedCoursesPage;
