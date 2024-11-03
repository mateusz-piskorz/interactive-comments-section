import { Comments } from '@/features/comments';
import { createFileRoute, useParams } from '@tanstack/react-router';

const Component = () => {
  const { bookSlug } = useParams({ from: '/books/$bookSlug/' });

  return (
    <div>
      <span>'/books/$bookSlug'</span>
      <Comments bookSlug={bookSlug} />
    </div>
  );
};

export const Route = createFileRoute('/books/$bookSlug/')({
  component: Component,
});
