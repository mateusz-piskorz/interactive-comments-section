import React, { useMemo, FC, useContext, useState, useEffect } from "react";
import { useAsync } from "../../../../hooks/useAsync";
import { getComments, getComment } from "../../services/comments";
import Countdown from "react-countdown";
import { CommentsProviderProps, ContextType, Comment } from "./types";
import { defaultState } from "./constants";
import { Loading } from "../../../../components/Loading";
import { socket } from "../../../../socket";

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
    value: comments,
    error,
    loading,
    setLoading,
    setError,
    setValue,
  } = useAsync(() => getComments({ userId: userDetails._id }));

  useEffect(
    function canIAddCommentEffect() {
      if (!canIAddComment) {
        setTimeout(() => {
          setCanIAddComment(true);
        }, 60000);
      }
    },
    [canIAddComment]
  );

  useEffect(function onFirstRender() {
    const onNewCommentAdded = (props: any) => {
      setLoading(true);
      getComment({ userId: userDetails._id, commentId: props.commentId })
        .then((newComment: any) => {
          setValue((prev: any) => [...prev, newComment]);
          setError(undefined);
          return newComment;
        })
        .catch((error: any) => {
          setError(error);
          setValue(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    socket.on("new-comment-added", onNewCommentAdded);

    return () => {
      socket.off("new-comment-added", onNewCommentAdded);
    };
  }, []);

  const countDown = useMemo(
    () => <Countdown date={Date.now() + 60000} />,
    [canIAddComment]
  );

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
        countDown,
        setCanIAddComment,
        canIAddComment,
        comments: comments,
        rootComments: commentsByParentId["root"],
        getReplies,
        userDetails,
      }}
    >
      {error && <h1>{error.code}</h1>}
      {loading && <h1>Loading...</h1>}
      {comments && children}
    </Context.Provider>
  );
};
