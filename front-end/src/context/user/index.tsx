import React, { FC, useContext, ReactNode, useEffect, useState } from "react";
import { RegisterForm } from "../../features/RegisterForm";
import { UserDetails, getUserDetails } from "../../services/user";
import { Dialog } from "../../features/Dialog";

export const localStorageIdKey = "interactive-comments-section:userId";

const defaultState = {
  user: {
    _id: "",
    avatar: "avatar1",
    color: "",
    name: "user",
  } as const,
  setUser: () => {},
};

type ContextType = {
  user: UserDetails;
  setUser: React.Dispatch<React.SetStateAction<UserDetails>>;
};

const Context = React.createContext<ContextType>(defaultState);

export const useUser = () => {
  return useContext(Context);
};

export const UserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails>(defaultState.user);
  const [error, setError] = useState<string | false>(false);

  useEffect(() => {
    const userId = localStorage.getItem(localStorageIdKey);
    if (userId && userId !== "") {
      getUserDetails({ userId: JSON.parse(userId) })
        .then((data) => setUser(data))
        .catch((err) => setError(err.message));
    }
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {error ? (
        <Dialog
          type="info"
          description={error}
          onCancel={() => setError(false)}
        />
      ) : user._id !== "" ? (
        children
      ) : (
        <RegisterForm />
      )}
    </Context.Provider>
  );
};
