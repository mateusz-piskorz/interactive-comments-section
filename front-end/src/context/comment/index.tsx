import React, { FC, useContext, useEffect, ReactNode } from "react";
import { useAsync } from "../../hooks/useAsync";
import { getComments } from "../../services/comments";
import { ContextType } from "./types";
import { socket } from "../../socket";
import { useUser } from "../user";
import { Comment } from "../../types";

const Context = React.createContext<ContextType | null>(null);

export const useComment = (commentId: string = "root") => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useUser context is undefined");
  } else {
    const comment = context.comments.find(({ _id }) => _id === commentId);
    const childComments = context.comments.filter(
      ({ parentId }) => parentId === commentId
    );

    return { comment, childComments };
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

  if (error) return <h1>{error.message}</h1>;

  if (loading) return <h1>Loading...</h1>;

  return (
    <Context.Provider
      value={{
        comments: comments!,
      }}
    >
      {children}
    </Context.Provider>
  );
};
