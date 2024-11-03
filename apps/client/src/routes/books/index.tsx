import { tsr } from '@/global/utils/ts-client';
import { createFileRoute } from '@tanstack/react-router';

const Component = () => {
  const { data } = tsr.books.getAllBooks.useQuery({
    queryKey: ['get-all-chapters'],
  });

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <div>
      <p>Hello /books/$bookSlug/chapters/!</p>
      <div>
        {data.body.data.map((book) => (
          <div key={book.id}>
            <a href={`/books/${book.attributes.slug}`}>
              {book.attributes.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/books/')({
  component: Component,
});
