import { useContext, useEffect, useState } from 'react';

import { AuthContext } from 'providers/auth';
import http from 'services/api';

export const useRefreshToken = () => {
  const [authChecking, setAuthChecking] = useState(true);

  const { setIsAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem('access');
  useEffect(() => {
    if (token) {
      http.defaults.headers.common = {
        Authorization: token,
      };
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.clear();
    }

    setAuthChecking(false);
  }, []);

  return {
    isLoading: authChecking,
  };
};
