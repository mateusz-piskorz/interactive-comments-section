import React, { FC, ReactNode, useContext, useEffect, useState } from "react";

export type ContextType = {
  d: any;
};

const Context = React.createContext<ContextType | null>(null);

export const useAuth = (folderId?: string) => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useAuth context is undefined");
  } else {
    return context;
  }
};

export const AuthProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <Context.Provider value={{ d: "d" }}>{children}</Context.Provider>;
};
