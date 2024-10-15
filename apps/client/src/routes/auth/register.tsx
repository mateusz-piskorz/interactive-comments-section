import { RegisterForm } from '@/components/auth/register/RegisterForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: RegisterForm,
});
