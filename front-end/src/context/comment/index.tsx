import React, { FC, useContext, ReactNode, useEffect } from "react";
import { getComments } from "../../services/comments";
import { ContextType } from "./types";
import { Comment } from "../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socket } from "../../socket";

const Context = React.createContext<ContextType | null>(null);

export const useComment = (commentId: string = "root") => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useUser context is undefined");
  } else {
    const comment = context.comments.find(({ id }) => id === commentId);
    const childComments = context.comments.filter(
      ({ parentId }) => parentId === commentId
    );

    return { comment, childComments };
  }
};

export const CommentsProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getComments,
    queryKey: ["comments"],
  });

  useEffect(() => {
    const onCommentAdded = (newComment: Comment) => {
      queryClient.setQueryData(["comments"], (prev: Comment[]) => [
        ...prev,
        newComment,
      ]);
    };

    const onCommentEdited = (newComment: Comment) => {
      queryClient.setQueryData(["comments"], (prev: Comment[]) =>
        prev.map((comment) =>
          comment.id === newComment.id ? newComment : comment
        )
      );
    };

    const onCommentRemoved = (commentId: string) => {
      queryClient.setQueryData(["comments"], (prev: Comment[]) =>
        prev.filter((comment) => comment.id !== commentId)
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

  if (status === "error") return <h1>{error.message}</h1>;

  if (status === "pending") return <h1>Loading...</h1>;

  return (
    <Context.Provider
      value={{
        comments: data,
      }}
    >
      {children}
    </Context.Provider>
  );
};
