import { FC, useState } from "react";
import { Login as LoginComponent } from "./components/Login";
import { Register } from "./components/Register";

export type OnLogin = (userId: string) => void;

type LoginProps = {
  onLogin: OnLogin;
};

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <>
      {isNewUser ? (
        <Register onLogin={onLogin} />
      ) : (
        <LoginComponent onLogin={onLogin} newUser={() => setIsNewUser(true)} />
      )}
    </>
  );
};
