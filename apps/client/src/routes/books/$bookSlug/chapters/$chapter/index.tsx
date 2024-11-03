import { createFileRoute, useParams } from '@tanstack/react-router';
import { tsr } from '@/global/utils/ts-client';

const Component = () => {
  const { bookSlug, chapter } = useParams({
    from: '/books/$bookSlug/chapters/$chapter/',
  });

  const { data } = tsr.books.chapters.getChapter.useQuery({
    queryKey: ['chapter', bookSlug, chapter],
    queryData: { params: { bookSlug, chapterNumber: chapter } },
  });

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {data.body.text.split('\n').join('\n\n')}
    </span>
  );
};

export const Route = createFileRoute('/books/$bookSlug/chapters/$chapter/')({
  component: Component,
});
