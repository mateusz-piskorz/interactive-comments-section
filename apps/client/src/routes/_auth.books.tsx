import { tsr } from '@/global/utils/ts-client';
import { createFileRoute } from '@tanstack/react-router';
import { BookBlock } from '@/global/components/BookBlock';

export const Route = createFileRoute('/_auth/books')({
  component: BooksPage,
});

function BooksPage() {
  const { data } = tsr.books.getAllBooks.useQuery({
    queryKey: ['get-all-chapters'],
  });

  console.log(data);

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <div>
      <h1>Hello /books</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.body.data.map(({ id, attributes }) => (
          <BookBlock key={id} {...attributes} />
        ))}
      </div>
    </div>
  );
}
