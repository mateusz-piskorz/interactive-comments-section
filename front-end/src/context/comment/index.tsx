import React, { FC, useContext, ReactNode, useEffect } from "react";
import { getComments } from "../../services/comments";
import { ContextType } from "./types";
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
    // const onCommentEdited = (comment: Comment) => {
    //   setComments((prev) =>
    //     prev!.map((prevComment) =>
    //       prevComment._id === comment._id
    //         ? { ...comment, yourComment: prevComment.yourComment }
    //         : prevComment
    //     )
    //   );
    // };

    // const onCommentRemoved = (props: { commentId: string }) => {
    //   setComments((prev) =>
    //     prev!.filter((comment) => comment._id !== props.commentId)
    //   );
    // };

    const onCommentAdded = (newComment: Comment) => {
      queryClient.setQueryData(["comments"], (prev: []) => [
        ...prev,
        newComment,
      ]);
    };
    const onCommentEdited = () => {
      console.log("onCommentEdited");
    };
    const onCommentRemoved = () => {
      console.log("onCommentRemoved");
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
