import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/books/$bookSlug/chapters/')({
  component: () => (
    <div>
      <p>Hello /books/$bookSlug/chapters/!</p>
      <p>
        Here we should show all chapters - and link navigate to specific chapter
      </p>
    </div>
  ),
});
