import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { UserDetails } from "../types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services";
import { username, password } from "../constants";

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
  const { mutate } = useMutation({
    onSuccess: setUser,
    mutationFn: signIn,
    mutationKey: ["signInRefresh"],
  });

  useEffect(
    function refetchToken() {
      if (user) {
        setTimeout(() => {
          if (username && password) {
            mutate({ username, password });
          }
        }, user!.expires_in * 1000 - 500);
      }
    },
    [user]
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

type UserContextType = {
  user: UserDetails | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | undefined>>;
};
