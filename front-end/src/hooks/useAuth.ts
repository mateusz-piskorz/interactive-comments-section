import { useEffect } from "react";
import { signIn } from "../services/user";
import { useAsyncFn } from "../hooks/useAsync";
import { LS_PASSWORD, LS_USERNAME } from "../constants";

export const useAuth = () => {
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

  return {
    isLogged: resData !== undefined,
    loading,
    error,
    setIsLogged: setResData,
  };
};
