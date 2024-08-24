import { useCallback, useState, useEffect } from "react";

type AnyFunc = (...args: any) => any;

export function useAsync<T extends AnyFunc>(
  fn: T,
  options?: {
    dependencies: any[];
    onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  }
) {
  const { execute, ...state } = useAsyncInternal<T>(fn, {
    ...options,
    initialLoading: true,
  });

  useEffect(() => {
    // @ts-ignore
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn<T extends AnyFunc>(
  fn: T,
  options?: {
    dependencies?: any[];
    initialLoading?: boolean;
    onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  }
) {
  return useAsyncInternal<T>(fn, options);
}

function useAsyncInternal<T extends AnyFunc>(
  fn: T,
  options?: {
    dependencies?: any[];
    initialLoading?: boolean;
    onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  }
) {
  const [loading, setLoading] = useState(options?.initialLoading || false);
  const [error, setError] = useState<any>();
  const [resData, setResData] = useState<Awaited<ReturnType<T>>>();

  const execute: (...params: Parameters<T>) => ReturnType<T> = useCallback(
    (...params: Parameters<T>) => {
      setLoading(true);
      return fn(...params)
        .then((data: Awaited<ReturnType<T>>) => {
          setResData(data);
          setError(undefined);
          options?.onSuccess && options.onSuccess(data);
          return data;
        })
        .catch((error: any) => {
          setError(error);
          setResData(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    options?.dependencies || []
  );

  return { loading, error, resData, execute, setLoading, setError, setResData };
}
