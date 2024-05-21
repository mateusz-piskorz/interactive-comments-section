import { FC, useEffect, useState } from "react";
import { signIn } from "../../services/user";
import { LS_PASSWORD, LS_USERNAME } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { RegisterForm } from "./features/RegisterForm";

type AuthProps = {
  onUserLogged: () => void;
};

export const Auth: FC<AuthProps> = ({ onUserLogged }) => {
  const [showRegister, setShowRegister] = useState(false);
  const { mutate, status } = useMutation({
    onSuccess: onUserLogged,
    mutationFn: signIn,
    mutationKey: ["repoData"],
  });

  useEffect(() => {
    const username = localStorage.getItem(LS_USERNAME);
    const password = localStorage.getItem(LS_PASSWORD);
    if (username && password) {
      mutate({ username, password });
    } else {
      setShowRegister(true);
    }
  }, []);

  console.log(status);
  return showRegister ? (
    <RegisterForm onSubmit={onUserLogged} />
  ) : status === "pending" ? (
    <h1>Loading...</h1>
  ) : (
    <h1>Error</h1>
  );
};
