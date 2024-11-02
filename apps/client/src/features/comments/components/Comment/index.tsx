import { FC, useState } from 'react';
import { Post, PostProps } from './Post';
import { Form } from '../Form';
import { CommentList } from '../CommentList';
import { useComment } from '../../context/Comments';

export const Comment: FC<PostProps> = (props) => {
  let { nestingLevel } = props;
  nestingLevel += 1;
  const { childComments, comment } = useComment(props.commentId);
  const [operation, setOperation] = useState<'add' | 'edit' | 'close'>('close');

  const onEdit = () => {
    setOperation((prev) => (prev === 'edit' ? 'close' : 'edit'));
  };

  const onReply = () => {
    setOperation((prev) => (prev === 'add' ? 'close' : 'add'));
  };

  const onSubmit = () => {
    setOperation('close');
  };

  return (
    <>
      <Post {...props} onReply={onReply} onEdit={onEdit} />
      {operation !== 'close' && (
        <Form
          parentId={props.commentId}
          initialContent={operation === 'edit' ? comment?.content : ''}
          onSubmit={onSubmit}
          operation={operation}
        />
      )}
      {childComments?.length > 0 && (
        <CommentList
          comments={childComments}
          nestingLevel={nestingLevel}
          nestedClass={true}
        />
      )}
    </>
  );
};
