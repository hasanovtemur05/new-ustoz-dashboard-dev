import {createContext, type ReactNode, useState} from "react";

interface IContext {
  isAuthenticated: boolean,
  setIsAuthenticated: (obj: any) => void,
}

export const AuthContext = createContext<IContext>({
  isAuthenticated: false,
  setIsAuthenticated: (val) => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}