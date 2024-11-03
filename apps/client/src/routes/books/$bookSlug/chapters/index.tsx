import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, useParams } from '@tanstack/react-router';

const Component = () => {
  const { bookSlug } = useParams({
    from: '/books/$bookSlug/chapters/',
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
      <p>Hello /books/$bookSlug/chapters/!</p>
      <div>
        {data.body.data.map((chapter) => (
          <div key={chapter.id}>
            <a href={`/books/${bookSlug}/chapters/${chapter.attributes.order}`}>
              {chapter.attributes.order} -{chapter.attributes.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/books/$bookSlug/chapters/')({
  component: Component,
});
