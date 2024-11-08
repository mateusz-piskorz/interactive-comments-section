import { Comments } from '@/features/comments';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/books/$bookSlug')({
  component: BookPage,
});

function BookPage() {
  const { bookSlug } = useParams({ from: '/_auth/books/$bookSlug' });

  return (
    <div>
      <h1>Hello /books/$bookSlug</h1>
      <p>
        <Link to="/books">Go back</Link>
      </p>
      <p>
        <Link to={`/books/${bookSlug}/chapters`}>Chapters</Link>
      </p>
      <p>'/books/$bookSlug'</p>
      <Comments bookSlug={bookSlug} />
    </div>
  );
}
