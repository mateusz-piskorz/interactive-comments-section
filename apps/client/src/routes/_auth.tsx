import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { tsr } from '@/global/utils/ts-client';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) {
      const { status, body } = await tsr.auth.getAuth.query();

      if (status === 200) {
        context.auth.setUser(body);
      } else {
        toast.info('Please sign in');
        throw redirect({
          to: '/login',
        });
      }
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="p-2 h-full">
      <header>
        <nav style={{ display: 'flex', gap: '8px' }}>
          <Link to="/">Home</Link>
          <Link to="/profile">profile</Link>
          <Link to="/books">books</Link>
        </nav>
      </header>
      <h1>Authenticated Route</h1>
      <hr></hr>
      <Outlet />
    </div>
  );
}
