import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/books/$bookSlug/chapters')({
  component: ChaptersPage,
});
function ChaptersPage() {
  const { bookSlug } = useParams({
    from: '/_auth/books/$bookSlug/chapters',
  });

  const { data } = tsr.books.chapters.getAllChapters.useQuery({
    queryKey: ['all-chapters', bookSlug],
    queryData: { params: { bookSlug } },
  });

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <div>
      <p>
        <Link to={`/books/${bookSlug}`}>Go back</Link>
      </p>
      <h1>Hello /books/$bookSlug/chapters/!</h1>
      <div>
        {data.body.data.map((chapter) => (
          <div key={chapter.id}>
            <Link
              to={`/books/${bookSlug}/chapters/${chapter.attributes.order}`}
            >
              {chapter.attributes.order} -{chapter.attributes.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
