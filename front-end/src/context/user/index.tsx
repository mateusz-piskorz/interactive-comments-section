import React, { FC, useContext, ReactNode, useEffect, useState } from "react";
import { RegisterForm } from "../../features/RegisterForm";
import { UserDetails, getUserDetails } from "../../services/user";
import { Dialog } from "../../features/Dialog";
import { useAsyncFn } from "../../hooks/useAsync";

export const localStorageIdKey = "interactive-comments-section:userId";

type ContextType = {
  user: UserDetails;
};

const Context = React.createContext<ContextType | null>(null);

export const useUser = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useUser context is undefined");
  } else {
    return { ...context, userId: context.user.id };
  }
};

export const UserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const {
    execute,
    error,
    setError,
    resData: user,
    setResData: setUser,
    loading,
    setLoading,
  } = useAsyncFn(getUserDetails);

  useEffect(() => {
    const userId = localStorage.getItem(localStorageIdKey);
    if (userId && userId !== "") {
      execute({ userId: JSON.parse(userId) });
    }
  }, []);

  const registerHandler = (data: UserDetails) => {
    setUser(data);
    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <Dialog description={error.message} onCancel={() => setError(false)} />
    );
  }

  if (user) {
    return <Context.Provider value={{ user }}>{children}</Context.Provider>;
  }

  return <RegisterForm onSubmit={registerHandler} />;
};
