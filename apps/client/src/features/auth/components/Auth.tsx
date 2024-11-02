import { tsr } from '@/global/utils/ts-client';
import { useEffect } from 'react';
import { LS_USERNAME, LS_PASSWORD } from '@/global/constants/localStorage';
import { useNavigate } from '@tanstack/react-router';
import { CustomLoader } from '@/global/components/CustomLoader';
import { toast } from 'sonner';
import { isUnknownErrorResponse } from '@ts-rest/core';

export const AuthComponent = () => {
  const navigate = useNavigate();

  const { mutate, contractEndpoint, isPending } = tsr.auth.singIn.useMutation({
    mutationKey: ['singIn'],
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: (error) => {
      if (isUnknownErrorResponse(error, contractEndpoint)) {
        toast.error('something wrong while singing in');
        navigate({ to: '/auth/register' });
        return;
      }

      if ('status' in error) {
        const { message } = error.body;
        toast.error(message);
        navigate({ to: '/auth/register' });
        return;
      }

      toast.error(error.message);
      navigate({ to: '/auth/register' });
    },
  });

  useEffect(() => {
    const username = localStorage.getItem(LS_USERNAME);
    const password = localStorage.getItem(LS_PASSWORD);

    if (!username || !password) {
      navigate({ to: '/auth/register' });
      return;
    }
  }, []);

  const loginHandler = () => {
    const username = localStorage.getItem(LS_USERNAME) || '';
    const password = localStorage.getItem(LS_PASSWORD) || '';

    mutate({ body: { username, password } });
  };

  return (
    <>
      <button onClick={loginHandler}>Login</button>
      {isPending && <CustomLoader />};
    </>
  );
};
