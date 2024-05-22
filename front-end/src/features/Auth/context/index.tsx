import React, { FC, ReactNode, useContext, useState } from "react";
import { UserDetails } from "../types";

type UserContextType = {
  user: UserDetails | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | undefined>>;
};

const UserContext = React.createContext<UserContextType | null>(null);

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useAuth context is undefined");
  } else {
    return context;
  }
};

export const AuthProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
