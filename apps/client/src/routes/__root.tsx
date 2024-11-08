import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { tsr } from '@/global/utils/ts-client';
import { z } from 'zod';
import { AuthContext } from '@/features/auth';
import { toast, Toaster } from 'sonner';

interface RouterContext {
  auth: AuthContext;
}

const globalSearchParams = z
  .object({
    example: z.string().optional(),
  })
  .optional();

export const Route = createRootRouteWithContext<RouterContext>()({
  validateSearch: globalSearchParams,
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

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
  }),
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>
        <Outlet />

        <Toaster />

        {import.meta.env.MODE === 'development' && (
          <TanStackRouterDevtools position="bottom-right" />
        )}
      </tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
