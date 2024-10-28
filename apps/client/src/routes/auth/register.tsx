import { RegisterForm } from '@/features/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: RegisterForm,
});
