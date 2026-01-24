import { IAuthData } from 'modules/auth/types';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  userData: IAuthData | null;
  setUserData: (data: IAuthData | null) => void;
}

export const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  userData: null,
  setUserData: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IAuthData | null>(null);

  const isAuthenticated = !!userData?.accessToken;

  useEffect(() => {
    const storedAuth = localStorage.getItem('userData');
    if (storedAuth) {
      setUserData(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      // localStorage.removeItem('userData');
    }
  }, [userData]);

  return <UserContext.Provider value={{ isAuthenticated, userData, setUserData }}>{children}</UserContext.Provider>;
};
