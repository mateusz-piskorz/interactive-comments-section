import { FC, useEffect } from "react";
import { useAuth } from "./context";
import { RegisterForm } from "./components/RegisterForm";
import { signIn } from "./services";
import { useMutation } from "@tanstack/react-query";
import { LS_PASSWORD, LS_USERNAME, password, username } from "./constants";
import { Dialog } from "../Dialog";

export { AuthProvider } from "./context";
export { useAuth };

export const Auth: FC = () => {
  const { user, setUser } = useAuth();
  const { mutate, status, error, reset } = useMutation({
    onSuccess: setUser,
    mutationFn: signIn,
    mutationKey: ["signIn"],
  });

  useEffect(() => {
    if (username && password) {
      mutate({ username, password });
    }
  }, []);

  if (status === "pending" && !user) return <h1>Loading user...</h1>;
  if (status === "error" && !user) {
    return (
      <Dialog
        description={error.message}
        onCancel={() => {
          if (error.message === "Unauthorized") {
            localStorage.removeItem(LS_USERNAME);
            localStorage.removeItem(LS_PASSWORD);
          }
          reset();
        }}
      />
    );
  }

  return <RegisterForm />;
};
