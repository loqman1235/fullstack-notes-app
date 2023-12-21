import React, { createContext, useState } from "react";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isAuth: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  const contextValue: AuthContextType = {
    isAuth,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
