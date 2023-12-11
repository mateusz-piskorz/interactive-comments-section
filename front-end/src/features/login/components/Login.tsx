import { FC, useEffect } from "react";
import { useAsyncFn } from "../../../hooks/useAsync";
import { login } from "../services/login";
import { styled } from "styled-components";
import { OnLogin } from "../index";
import { localStorageKey } from "../constants";
import { Dialog } from "../../../components/Dialog";

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
      value && onLogin(value._id);
    },
    [value]
  );

  return (
    <Dialog>
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
    </Dialog>
  );
};

const LoginWrapper = styled.div`
  background-color: white;
  padding: 40px;
`;
