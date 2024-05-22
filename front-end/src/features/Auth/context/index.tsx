import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { UserDetails } from "../types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services";
import { LS_PASSWORD, LS_USERNAME } from "../../../constants";

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
  const { mutate, status } = useMutation({
    onSuccess: (userDetails) => {
      setUser(userDetails);
    },
    mutationFn: signIn,
    mutationKey: ["signIn"],
  });

  useEffect(() => {
    const username = localStorage.getItem(LS_USERNAME);
    const password = localStorage.getItem(LS_PASSWORD);
    if (username && password) {
      mutate({ username, password });
    }
  }, []);

  useEffect(
    function refetchToken() {
      if (user) {
        const username = localStorage.getItem(LS_USERNAME)!;
        const password = localStorage.getItem(LS_PASSWORD)!;
        setTimeout(() => {
          mutate({ username, password });
        }, user!.expires_in * 1000 - 500);
      }
    },
    [user]
  );

  if (status === "pending" && !user) return <h1>Loading user...</h1>;
  if (status === "error" && !user) return <h1>Error getting user...</h1>;
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
