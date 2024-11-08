import { useAuth } from '@/features/auth/context/auth';
import { LS_PASSWORD, LS_USERNAME } from '@/global/constants/localStorage';
import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { ProfileAvatar } from '@/global/components/ProfileAvatar';
import { flushSync } from 'react-dom';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: async ({ context }) => {
    if (context.auth.user) {
      throw redirect({ to: '/' });
    }
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate: singInMutate } = tsr.auth.singIn.useMutation({
    mutationKey: ['singIn'],
    onSuccess: async (res) => {
      flushSync(() => {
        setUser(res.body);
        toast.success('Successfully logged in');
        navigate({
          to: '/',
        });
      });
    },
  });

  const { data: userData, isFetching } = tsr.users.getUser.useQuery({
    queryKey: ['getUser'],
    queryData: {
      params: { username: localStorage.getItem(LS_USERNAME) || '' },
    },
    enabled: () => {
      const username = localStorage.getItem(LS_USERNAME);
      const password = localStorage.getItem(LS_PASSWORD);
      if (!username || !password) {
        navigate({ to: '/register' });
        return false;
      }
      return true;
    },
  });

  return (
    <div>
      <h1>User data:</h1>
      {isFetching && <span>Fetching user...</span>}
      {userData?.body && (
        <>
          <h4>Is that you?</h4>
          <ProfileAvatar avatar={userData.body.avatar} />
          <span>{userData.body.username}</span>
          <button
            onClick={() =>
              singInMutate({
                body: {
                  username: localStorage.getItem(LS_USERNAME) || '',
                  password: localStorage.getItem(LS_PASSWORD) || '',
                },
              })
            }
          >
            Sing In as {userData.body.username}
          </button>
        </>
      )}
    </div>
  );
}
