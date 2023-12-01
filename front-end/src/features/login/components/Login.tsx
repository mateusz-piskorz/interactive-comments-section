import { FC, useEffect } from "react";
import { useAsyncFn } from "../../../hooks/useAsync";
import { login } from "../services/login";
import { styled } from "styled-components";
import { OnLogin } from "../index";
import { localStorageKey } from "../constants";

type LoginProps = {
  onLogin: OnLogin;
  newUser: () => void;
};

export const Login: FC<LoginProps> = ({ onLogin, newUser }) => {
  const { loading, error, value, execute } = useAsyncFn(login);

  useEffect(function onFirstRender() {
    const userId = localStorage.getItem(localStorageKey);
    if (userId && userId !== "") {
      execute({ userId });
    } else {
      newUser();
    }
  }, []);

  useEffect(
    function onSuccessLogin() {
      if (value) {
        onLogin(value._id);
      }
    },
    [value]
  );

  return (
    <>
      <LoginWrapper>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          error && (
            <>
              <strong className="error">login error: {error.code}</strong>
              <br />
              <p>try clear browser localStorage and refresh page</p>
            </>
          )
        )}
      </LoginWrapper>
    </>
  );
};

const LoginWrapper = styled.div`
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  max-width: 300px;
  background-color: white;
  width: 90%;
  padding: 40px;
`;
