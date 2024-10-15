import { LS_PASSWORD, LS_USERNAME } from '@/constants/localStorage';
import { tsr } from '@/utils/ts-client';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const useAuth = () => {
  const navigate = useNavigate();
  const { mutate, data, error } = tsr.auth.getAuth.useMutation({
    mutationKey: ['getAuth'],
  });

  useEffect(() => {
    const username = localStorage.getItem(LS_USERNAME);
    const password = localStorage.getItem(LS_PASSWORD);

    if (!username || !password) {
      navigate({ to: '/auth/register' });
      return;
    }

    mutate({ body: {} });
  }, []);

  if (error) {
    toast.error('something wrong with auth');
    navigate({ to: '/auth' });
    return undefined;
  }

  return data?.body;
};
