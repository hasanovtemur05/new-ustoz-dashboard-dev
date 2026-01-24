import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from 'components/ui/use-toast';
import { AuthContext } from 'providers/auth';
import http from 'services/api';
import { SignIn } from '../api';
import { IAuthData, UserRole, type IApi } from '../types';
import { UserContext } from 'providers/UserProvider';

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);
  const { toast } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: IApi.SignIn) => SignIn(values).then((res) => res.data.data),
    onSuccess: (data: IAuthData) => {
      setUserData(data);

      http.defaults.headers.common = {
        Authorization: data?.accessToken,
      };

      localStorage.setItem('access', data?.accessToken);
      localStorage.setItem('role', data?.role);
      setIsAuthenticated(true);
      toast({
        variant: 'success',
        title: 'Muvaffaqiyat!',
        description: 'UstozAI platformasiga xush kelibsiz!',
      });
      if (data.role == UserRole.NOTIFICATION_ADMIN) {
        navigate('/notifications');
      } else if (data.role == UserRole.STATISTICS_ADMIN) {
        navigate('/');
      } else if (data.role == UserRole.COURSE_ADMIN) {
        navigate('/courses');
      } else if (data.role == UserRole.SHOP_ADMIN) {
        navigate('/orders');
      } else if (data.role == UserRole.SUPER_ADMIN) {
        navigate('/');
      } else {
        navigate('/');
      }
    },
    onError: (error: any) => {
      localStorage.clear();
      console.log(error.message);

      toast({
        variant: 'destructive',
        title: 'Xatolik!',
        description: error.message,
      });

      setIsAuthenticated(false);
    },
  });

  return {
    triggerSignIn: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
