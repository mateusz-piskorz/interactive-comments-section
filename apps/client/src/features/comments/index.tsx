import { CommentsProvider, useComment } from './context/Comments';
import { BookSlugProvider } from './context/BookSlug';
import { CommentList } from './components/CommentList';
import { Form } from './components/Form';

const CommentsSection = () => {
  const { childComments } = useComment();

  if (childComments.length === 0) return <div>Brak komentarzy</div>;
  return (
    <div>
      <CommentList comments={childComments} nestingLevel={0} />
      <Form operation="add" parentId="root" fixedPosition />
    </div>
  );
};

export const Comments = ({ bookSlug }: { bookSlug: string }) => {
  return (
    <BookSlugProvider bookSlug={bookSlug}>
      <CommentsProvider>
        <CommentsSection />
      </CommentsProvider>
    </BookSlugProvider>
  );
};
