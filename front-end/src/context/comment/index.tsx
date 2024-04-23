import React, { useMemo, FC, useContext, useEffect, ReactNode } from "react";
import { useAsync } from "../../hooks/useAsync";
import { getComments, getComment } from "../../services/comments";
import { ContextType } from "./types";
import { defaultState } from "./constants";
import { socket } from "../../socket";
import { useUser } from "../user";
import { Comment } from "../../types";

const Context = React.createContext<ContextType>(defaultState);

export const useComment = () => {
  return useContext(Context);
};

export const CommentsProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const {
    resData: comments,
    error,
    loading,
    setResData: setComments,
  } = useAsync(() => getComments({ userId: user._id }));

  useEffect(() => {
    const onCommentAdded = ({ comment }: { comment: Comment }) => {
      setComments((prev: Comment[]) => [...prev, comment]);
    };

    const onCommentEdited = ({ comment }: { comment: Comment }) => {
      setComments((prev: Comment[]) =>
        prev.map((prevComment) =>
          prevComment._id === comment._id ? comment : prevComment
        )
      );
    };

    const onCommentRemoved = (props: { commentId: string }) => {
      setComments((prev: Comment[]) =>
        prev.filter((comment) => comment._id !== props.commentId)
      );
    };

    socket.on("comment-added", onCommentAdded);
    socket.on("comment-edited", onCommentEdited);
    socket.on("comment-removed", onCommentRemoved);

    return () => {
      socket.off("comment-added", onCommentAdded);
      socket.off("comment-edited", onCommentEdited);
      socket.off("comment-removed", onCommentRemoved);
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
        comments: comments,
        rootComments: commentsByParentId["root"],
        getReplies,
      }}
    >
      {error && <h1>{error.code}</h1>}
      {loading && <h1>Loading</h1>}
      {comments && children}
    </Context.Provider>
  );
};
