import { FC, useEffect } from "react";
import { signIn } from "../../services/user";
import { useAsyncFn } from "../../hooks/useAsync";
import { LS_PASSWORD, LS_USERNAME } from "../../constants";

export const Auth: FC = () => {
  const { execute, error, loading, resData, setLoading, setResData } =
    useAsyncFn(signIn, {
      initialLoading: true,
    });

  useEffect(() => {
    const username = localStorage.getItem(LS_USERNAME);
    const password = localStorage.getItem(LS_PASSWORD);
    if (username && password) {
      execute({ username, password });
    } else {
      setLoading(false);
    }
  }, []);

  return <div>Auth</div>;
};

//use auth
// if jwtToken in localStorage = return isUserLogged=true
// else if userName and Password in localStorage = /users/signIn -> save JWT in localStorage
//
// return isUserLogged
