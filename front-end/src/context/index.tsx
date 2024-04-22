import React, { useMemo, FC, useContext, useState, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { getComments, getComment } from "../services/comments";
import { CommentsProviderProps, ContextType, Comment } from "./types";
import { defaultState } from "./constants";
import { socket } from "../socket";

export type { Comment };

const Context = React.createContext<ContextType>(defaultState);

export const useComment = () => {
  return useContext(Context);
};

export const CommentsProvider: FC<CommentsProviderProps> = ({
  children,
  userDetails,
}) => {
  const [canIAddComment, setCanIAddComment] = useState(true);
  const {
    resData: comments,
    error,
    loading,
    setError,
    setResData: setComments,
  } = useAsync(() => getComments({ userId: userDetails._id }));

  useEffect(() => {
    const onNewCommentAdded = (props: any) => {
      getComment({ userId: userDetails._id, commentId: props.commentId })
        .then((newComment: any) => {
          setComments((prev: any) => [...prev, newComment]);
          setError(undefined);
          return newComment;
        })
        .catch((error: any) => {
          setError(error);
          setComments(undefined);
        });
    };

    const onCommentEdited = (props: any) => {
      getComment({ userId: userDetails._id, commentId: props.commentId })
        .then((newComment: any) => {
          setComments((prev: any) =>
            prev.map((comment: any) => {
              if (comment._id === newComment._id) {
                return newComment;
              } else {
                return comment;
              }
            })
          );
          setError(undefined);
          return newComment;
        })
        .catch((error: any) => {
          setError(error);
          setComments(undefined);
        });
    };

    const onCommentRemoved = (props: any) => {
      setComments((prev: Comment[]) =>
        prev.filter((comment) => comment._id !== props.commentId)
      );
    };

    socket.on("comment-edited", onCommentEdited);

    socket.on("new-comment-added", onNewCommentAdded);
    socket.on("comment-removed", onCommentRemoved);

    return () => {
      socket.off("new-comment-added", onNewCommentAdded);
      socket.off("comment-removed", onCommentRemoved);
      socket.off("comment-edited", onCommentEdited);
    };
  }, []);

  const commentsByParentId = useMemo(() => {
    if (comments == null) return [];
    const group = {} as any;
    comments.forEach((comment: { parentId: string }) => {
      if (comment?.parentId) {
        group[comment.parentId] ||= [];
        group[comment.parentId].push(comment);
      } else {
        group["root"] ||= [];
        group["root"].push(comment);
      }
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    return commentsByParentId[parentId];
  };

  return (
    <Context.Provider
      value={{
        setCanIAddComment,
        canIAddComment,
        comments: comments,
        rootComments: commentsByParentId["root"],
        getReplies,
        userDetails,
      }}
    >
      {error && <h1>{error.code}</h1>}
      {loading && <h1>Loading</h1>}
      {comments && children}
    </Context.Provider>
  );
};
