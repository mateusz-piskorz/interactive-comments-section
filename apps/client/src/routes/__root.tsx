import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tsr } from '../utils/ts-client';
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';
import { CustomToaster } from '@/components/common/CustomToaster';

const globalSearchParams = z.object({
  page: fallback(z.number(), 1).default(1),
  toastMsg: fallback(
    z.object({
      message: z.string(),
      type: z.enum(['success', 'error', 'info']).optional(),
    }),
    { message: '', type: 'info' }
  ).default({ message: '', type: 'info' }),
});

export const Route = createRootRoute({
  validateSearch: zodSearchValidator(globalSearchParams),
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <>
        <p>This page doesn't exist!</p>
        <Link to="/">Go back to home</Link>
      </>
    );
  },
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>
        <header>
          <nav style={{ display: 'flex', gap: '8px' }}>
            <Link to="/profile">profile</Link>
            <Link to="/auth">auth</Link>
            <Link to="/auth/register">auth/register</Link>
          </nav>
        </header>
        <Outlet />

        <CustomToaster />

        {import.meta.env.MODE === 'development' && (
          <TanStackRouterDevtools position="bottom-right" />
        )}
      </tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
