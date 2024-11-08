import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/books')({
  component: BooksPage,
});

function BooksPage() {
  const { data } = tsr.books.getAllBooks.useQuery({
    queryKey: ['get-all-chapters'],
  });

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <div>
      <h1>Hello /books</h1>
      <div>
        {data.body.data.map((book) => (
          <div key={book.id}>
            <Link to={`/books/${book.attributes.slug}`}>
              {book.attributes.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
