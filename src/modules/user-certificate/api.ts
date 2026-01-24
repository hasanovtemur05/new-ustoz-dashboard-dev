import http from 'services/api';
import { cleanEmptyStrings } from 'utils/clearEmptyKeys';

export const GetDatasList = async (currentPage: number, courseId?: string, region?: string, district?: string) => {
  return await http.get(`certificate/users?pageSize=10`, {
    params: cleanEmptyStrings({ courseId, pageNumber: currentPage, region, district }),
  });
};
