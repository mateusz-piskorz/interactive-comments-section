import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { Login as LoginComponent } from "./components/Login";
import { Register } from "./components/Register";

export type OnLogin = (userId: string) => void;

type LoginProps = {
  onLogin: OnLogin;
};

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  console.log(isNewUser);
  return (
    <>
      {isNewUser ? (
        <Register onLogin={onLogin} />
      ) : (
        <LoginComponent onLogin={onLogin} newUser={() => setIsNewUser(true)} />
      )}
      <BackDrop />
    </>
  );
};

const BackDrop = styled.div(() => {
  return css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    backdrop-filter: blur(3px);
  `;
});
