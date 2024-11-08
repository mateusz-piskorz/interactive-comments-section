import { createFileRoute, redirect } from '@tanstack/react-router';
import { RegisterForm } from '@/features/auth';

export const Route = createFileRoute('/register')({
  component: RegisterForm,
  beforeLoad: async ({ context }) => {
    if (context.auth.user) {
      throw redirect({ to: '/' });
    }
  },
});
