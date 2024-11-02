import { createFileRoute } from '@tanstack/react-router';
import { AuthComponent } from '@/features/auth';

export const Route = createFileRoute('/auth/')({
  component: AuthComponent,
});
