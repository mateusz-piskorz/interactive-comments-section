import { makeRequest } from "../../../services/makeRequest";

export const getComments: GetComments = ({ userId }) => {
  return makeRequest("/comments", {
    method: "post",
    data: { userId },
  });
};

export const addComment: AddComment = ({ content, parentId, userId }) => {
  return makeRequest("/comments/add", {
    method: "post",
    data: { content, parentId, userId },
  });
};

export const editComment: EditComment = ({ content, commentId }) => {
  return makeRequest("/comments/edit", {
    method: "put",
    data: { content, commentId },
  });
};

export const addLike: AddLike = ({ commentId, userId, like }) => {
  return makeRequest("/comments/likes", {
    method: "post",
    data: { like, commentId, userId },
  });
};

export const removeComment: RemoveComment = ({ commentId, userId }) => {
  return makeRequest("/comments/remove", {
    method: "post",
    data: { commentId, userId },
  });
};

export type RemoveComment = ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => Promise<any>;

export type GetComments = ({ userId }: { userId: string }) => Promise<any>;

export type AddLike = ({
  commentId,
  like,
  userId,
}: {
  commentId: string;
  like: "plus" | "minus";
  userId: string;
}) => Promise<any>;

export type EditComment = ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => Promise<any>;
export type AddComment = ({
  content,
  parentId,
  userId,
}: {
  content: string;
  userId: string;
  parentId?: string | undefined;
}) => Promise<any>;
