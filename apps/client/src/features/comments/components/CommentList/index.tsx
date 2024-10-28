import { FC } from 'react';
import { Comment } from '../Comment';
import c from './main.module.scss';
import { CommentWithAuthor } from '../../types/comment';

type CommentListProps = {
  comments: CommentWithAuthor[];
  nestingLevel: number;
  nestedClass?: boolean;
};

export const CommentList: FC<CommentListProps> = ({
  comments,
  nestingLevel,
  nestedClass,
}) => {
  const className = `${c.CommentList}${` ${
    nestedClass ? c.CommentList___nested : ''
  }`}`;

  return (
    <div className={className}>
      {comments?.map(({ id }) => (
        <Comment nestingLevel={nestingLevel} commentId={id} key={id} />
      ))}
    </div>
  );
};
