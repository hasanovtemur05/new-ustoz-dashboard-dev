import { DateRange } from 'react-day-picker';
import http from 'services/api';
import { cleanEmptyStrings } from 'utils/clearEmptyKeys';

export const GetDatasList = async (currentPage: number, courseId?: string, region?: string, district?: string, date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/users/with/half/complete/course`, {
    params: cleanEmptyStrings({ courseId, pageNumber: currentPage, region, district, startDate, endDate }),
  });
};
