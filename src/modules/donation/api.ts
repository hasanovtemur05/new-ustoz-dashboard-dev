import http from 'services/api';

export const GetDatasList = async (currentPage: number) => {
  return await http.get(`/donation?pageSize=10&pageNumber=${currentPage}`);
};
