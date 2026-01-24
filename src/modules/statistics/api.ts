import http from 'services/api';
import { DateRange } from 'react-day-picker';
import { AuthType } from './types';

export const GetOverview = async () => {
  return await http.get(`/statistics/admin/main`);
};

export const GetNewUsers = async (date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/users/daily`, { params: { startDate, endDate } });
};

export const GetDalyDonation = async (date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/donation/daily`, { params: { startDate, endDate } });
};

export const GetDalyCertificateCount = async (date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/daily/certificate/statistics`, { params: { startDate, endDate } });
};

export const GetMonthlyOverview = async () => {
  const date = new Date().toISOString();
  return await http.get(`/statistics/main/monthly`, { params: { date } });
};

export const GetUsersByAuthMethod = async (type: AuthType, date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/users/authMethod`, { params: { startDate, endDate, type } });
};

export const GetUsersByHalfCompletedCourses = async (type: AuthType, date?: DateRange) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';
  return await http.get(`/statistics/users/with/half/complete/course`, { params: { startDate, endDate, type } });
};

export const GetLessonStatistics = async () => {
  return await http.get(`/statistics/by/lesson`);
};

export const GetCoinStatistics = async (from?: number, to?: number) => {
  return await http.get(`/statistics/by/coin`, { params: { from, to } });
};
