import { tsr } from '@/global/utils/ts-client';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/books/$bookSlug/chapters/$chapter'
)({
  component: ChapterPage,
});

function ChapterPage() {
  const { bookSlug, chapter } = useParams({
    from: '/_auth/books/$bookSlug/chapters/$chapter',
  });

  const { data } = tsr.books.chapters.getChapter.useQuery({
    queryKey: ['chapter', bookSlug, chapter],
    queryData: { params: { bookSlug, chapterNumber: chapter } },
  });

  if (!data) {
    return <span>Loading... (or something went wrong)</span>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Hello /books/$bookSlug/chapters/$chapter</h1>
      <Link to={`/books/${bookSlug}/chapters/`}>Go Back</Link>
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {data.body.text.split('\n').join('\n\n')}
      </span>
    </div>
  );
}
