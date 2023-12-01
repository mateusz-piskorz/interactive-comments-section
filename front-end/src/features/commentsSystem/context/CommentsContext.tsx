import React, { ReactNode, useMemo, FC, useContext } from "react";
import { useAsync } from "../../../hooks/useAsync";
import { getComments } from "../services/comments";

const exampleDate = new Date();
type CommentsProviderProps = { children: ReactNode; userId: string };

type Comment = { content: string; _id: string; createdAt: Date };

type ContextType = {
  comments: (
    | (Comment & {
        parentId?: undefined;
      })
    | (Comment & {
        parentId: string;
      })
  )[];
  rootComments: Comment[];
  getReplies: (parentId: string) => Comment[] &
    {
      parentId: string;
    }[];
  userId: string;
};

const defaultState = {
  userId: "",
  comments: [
    {
      content: "",
      _id: "",
      createdAt: exampleDate,
      parentId: "",
    },
  ],
  rootComments: [
    {
      content: "",
      _id: "",
      createdAt: exampleDate,
    },
  ],
  getReplies: (parentId: string) => [
    {
      content: "",
      _id: "",
      createdAt: exampleDate,
      parentId: "",
    },
  ],
};

const Context = React.createContext<ContextType>(defaultState);

export const useComment = () => {
  return useContext(Context);
};

export const CommentsProvider: FC<CommentsProviderProps> = ({
  children,
  userId,
}) => {
  const {
    value: comments,
    error,
    loading,
  } = useAsync(() => getComments({ userId }));
  console.log(comments);
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

  if (error) return <h1>{error.code}</h1>;
  if (loading) return <h1>Loading</h1>;

  return (
    <Context.Provider
      value={{
        comments: comments,
        rootComments: commentsByParentId["root"],
        getReplies,
        userId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
