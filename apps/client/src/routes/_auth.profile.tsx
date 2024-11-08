import { useAuth } from '@/features/auth/context/auth';
import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate({ from: '/' });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth(true);

  const singOut = async () => {
    const { status } = await tsr.auth.singOut.mutate({ body: {} });

    if (status === 201) {
      flushSync(() => {
        setUser(undefined);
        toast.info('You have been logged out');
        navigate({
          to: '/login',
        });
      });
    } else {
      toast.error('singOut failed!');
    }
  };

  const singOutHandler = async () => {
    setLoading(true);
    await singOut();
    setLoading(false);
  };

  return (
    <div>
      <h3>Welcome {user?.username}</h3>
      <button disabled={loading} onClick={singOutHandler}>
        log out
      </button>
    </div>
  );
}
