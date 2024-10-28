/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, ReactNode, useEffect } from 'react';
import { socket } from '@/global/socket';
import { tsr } from '@/global/utils/ts-client';
import { CommentWithAuthor } from '../types/comment';

export type ContextType = {
  comments: CommentWithAuthor[];
};

const Context = React.createContext<ContextType | null>(null);

export const useComment = (commentId = 'root') => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useUser context is undefined');
  } else {
    const comment = context.comments.find(({ id }) => id === commentId);
    const childComments = context.comments.filter(
      ({ parentId }) => parentId === commentId
    );

    return { comment, childComments };
  }
};

export const CommentsProvider = ({
  children,
  bookId,
}: {
  children?: ReactNode;
  bookId: string;
}) => {
  console.log(bookId);
  const tsrQueryClient = tsr.useQueryClient();

  const { status, data } = tsr.comments.getComments.useQuery({
    queryKey: ['comments'],
  });

  useEffect(() => {
    const onCommentAdded = (newComment: CommentWithAuthor) => {
      tsrQueryClient.comments.getComments.setQueryData(['comments'], (prev) => {
        if (!prev) return prev;
        return { ...prev, body: [...prev.body, newComment] };
      });
    };

    const onCommentEdited = (newComment: CommentWithAuthor) => {
      tsrQueryClient.comments.getComments.setQueryData(['comments'], (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          body: prev.body.map((comment) =>
            comment.id === newComment.id ? newComment : comment
          ),
        };
      });
    };

    const onCommentRemoved = (commentId: CommentWithAuthor) => {
      tsrQueryClient.comments.getComments.setQueryData(['comments'], (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          body: prev.body.filter((comment: any) => comment.id !== commentId),
        };
      });
    };

    socket.on('comment-added', onCommentAdded);
    socket.on('comment-edited', onCommentEdited);
    socket.on('comment-removed', onCommentRemoved);

    return () => {
      socket.off('comment-added', onCommentAdded);
      socket.off('comment-edited', onCommentEdited);
      socket.off('comment-removed', onCommentRemoved);
    };
  }, []);

  if (status === 'error')
    return <h1>something wrong while fetching comments</h1>;

  if (status === 'pending') return <h1>Loading...</h1>;

  return (
    <Context.Provider
      value={{
        comments: data.body,
      }}
    >
      {children}
    </Context.Provider>
  );
};
