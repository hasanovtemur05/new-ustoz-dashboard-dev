import http from "services/api";

export const GetFile = async () => {
  return await http.get(`/statistics/users/new/today`, {
    responseType: 'blob', // BU JUDA MUHIM!
  });
};