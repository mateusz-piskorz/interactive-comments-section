import { FC, useEffect, useState } from "react";
import { signIn } from "./services";
import { LS_PASSWORD, LS_USERNAME } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { RegisterForm } from "./components/RegisterForm";
import { useAuth, AuthProvider } from "./context";
import c from "./Auth.module.scss";

export { AuthProvider, useAuth };

export const Auth: FC = () => {
  const { user, setUser } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
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
    } else if (!user) {
      setShowRegister(true);
    }
  }, []);

  const className = { className: user && c.Wrapper___displayNone };
  return (
    <div {...className}>
      {showRegister ? (
        <RegisterForm />
      ) : status === "pending" ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Error</h1>
      )}
    </div>
  );
};
