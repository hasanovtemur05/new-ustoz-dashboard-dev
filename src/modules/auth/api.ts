import http from 'services/api';
import { IApi } from './types';

export const SignIn = async (values: IApi.SignIn) => {
  return await http.post(`/auth/admin/login`, {
    ...values,
  });
};
