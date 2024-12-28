import { createContext, ReactNode, useContext, useState } from "react";
import { UserType } from "../../types/shared/user";

type AuthContextType = {
  isLoggedIn: UserType | undefined;
  authenticateUser: (user: UserType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<UserType | undefined>(undefined);

  function authenticateUser(user: UserType) {
    setIsLoggedIn(user);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "UseAppContext must be used inside the AuthContextProvider"
    );
  }

  return context;
};
