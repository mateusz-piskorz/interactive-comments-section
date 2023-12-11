import { useCallback, useEffect, useState } from "react";
import {
  AddComment,
  GetComments,
  EditComment,
  AddLike,
  RemoveComment,
} from "../features/commentsSystem/services/comments";
import { GetUserDetails } from "../features/commentsSystem/services/user";
import { Register, Login } from "../features/login/services/login";

type FunctionType =
  | AddComment
  | GetComments
  | Register
  | Login
  | GetUserDetails
  | EditComment
  | AddLike
  | RemoveComment;

export function useAsync(fn: FunctionType, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(fn, dependencies, true);
  useEffect(() => {
    // @ts-ignore
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn(fn: FunctionType, dependencies = []) {
  return useAsyncInternal(fn, dependencies, false);
}

function useAsyncInternal(
  fn: FunctionType,
  dependencies: any[],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<any>();

  const execute = useCallback((...params: Parameters<FunctionType>) => {
    setLoading(true);
    //@ts-ignore
    return fn(...params)
      .then((data: any) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error: any) => {
        setError(error);
        setValue(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute, setLoading, setError, setValue };
}
