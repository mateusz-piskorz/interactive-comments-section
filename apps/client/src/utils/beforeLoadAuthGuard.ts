import { redirect } from '@tanstack/react-router';
import { getAuth } from './auth';

export const beforeLoadAuthGuard = async () => {
  if (!(await getAuth())) {
    throw redirect({
      to: '/auth',
      search: {
        toastMsg: { message: 'Unauthorized, please sign in', type: 'error' },
      },
    });
  }
};
