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

export const addLikes: EditComment = ({ commentId, likes }) => {
  return makeRequest("/comments/likes", {
    method: "put",
    data: { content, commentId },
  });
};

export type GetComments = ({ userId }: { userId: string }) => Promise<any>;

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
