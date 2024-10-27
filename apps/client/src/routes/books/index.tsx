import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/books/')({
  component: () => <div>Hello /books/!</div>,
});
