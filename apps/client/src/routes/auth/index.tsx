import { createFileRoute } from '@tanstack/react-router';
import { AuthComponent } from '@/components/auth/AuthComponent';

export const Route = createFileRoute('/auth/')({
  component: AuthComponent,
});
