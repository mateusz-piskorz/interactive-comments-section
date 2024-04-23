import React, { useMemo, FC, useContext, useEffect, ReactNode } from "react";
import { useAsync } from "../../hooks/useAsync";
import { getComments, getComment } from "../../services/comments";
import { ContextType } from "./types";
import { socket } from "../../socket";
import { useUser } from "../user";
import { Comment } from "../../types";

const Context = React.createContext<ContextType | null>(null);

export const useComment = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useUser context is undefined");
  } else {
    return context;
  }
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
      setComments((prev) => [...prev!, comment]);
    };

    const onCommentEdited = ({ comment }: { comment: Comment }) => {
      setComments((prev) =>
        prev!.map((prevComment) =>
          prevComment._id === comment._id ? comment : prevComment
        )
      );
    };

    const onCommentRemoved = (props: { commentId: string }) => {
      setComments((prev) =>
        prev!.filter((comment) => comment._id !== props.commentId)
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
    comments.forEach((comment) => {
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

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Context.Provider
      value={{
        comments: comments!,
        rootComments: getReplies("root"),
        getReplies,
      }}
    >
      {comments && children}
    </Context.Provider>
  );
};
