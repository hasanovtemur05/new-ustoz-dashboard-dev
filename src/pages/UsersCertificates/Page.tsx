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
import http from 'services/api';
import { Button } from 'components/ui/button';

export type CustomSelectType = { name: string; id: string | number; disabled?: boolean; [key: string]: any };

const UsersCertificatesPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isPanding, setPanding] = useState(false);
  const [data, setData] = useState<IUserCertificate>();
  const [currentPage, setCurrentPage] = useState(1);
  const [course, setCourse] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [districts, setDistricts] = useState<CustomSelectType[]>([]);
  const [courses, setCourses] = useState<CustomSelectType[]>([]);

  const { data: categories, isLoading, pagenationInfo } = useUserCertificateList(currentPage, course, region, district);
  const { data: coursesList } = useCoursesList({ isEnabled: !!categories });

  const getRowData = (info: IUserCertificate) => {
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
  

  async function handleDownload(apiUrl: string) {
    setPanding(true);
    try {
      const response = await http.get(`/statistics/certificate/by/${apiUrl}`, { responseType: 'blob' });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      const date = new Date().toISOString().split('T')[0];

      link.setAttribute('download', `users-data-${date}.xlsx`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Aniqlanmagan xatolik yuz berdi!');
    } finally {
      setPanding(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">Sertifikat olgan talabalar</h1>
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
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => handleDownload('users')}>Yuklab olish (userlar)</Button>
          <Button onClick={() => handleDownload('region')}>Yuklab olish (viloyatlar)</Button>
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

export default UsersCertificatesPage;
