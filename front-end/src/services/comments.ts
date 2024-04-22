import { makeRequest } from "./makeRequest";

export const getComments: GetComments = ({ userId }) => {
  return makeRequest("/comments", {
    method: "post",
    data: { userId },
  });
};

export const getComment: GetComment = ({ commentId, userId }) => {
  return makeRequest(`/comments/${commentId}`, {
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
  return makeRequest(`/comments/${commentId}`, {
    method: "put",
    data: { content },
  });
};

export const addLike: AddLike = ({ commentId, userId, likeType }) => {
  return makeRequest(`/comments/${likeType}`, {
    method: "post",
    data: { commentId, userId },
  });
};

export const removeComment: RemoveComment = ({ commentId, userId }) => {
  return makeRequest(`/comments/${commentId}`, {
    method: "delete",
    data: { userId },
  });
};

type RemoveComment = ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => Promise<any>;

type GetComments = ({ userId }: { userId: string }) => Promise<any>;

type GetComment = ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => Promise<any>;

type AddLike = ({
  commentId,
  userId,
  likeType,
}: {
  commentId: string;
  userId: string;
  likeType: "like" | "dislike";
}) => Promise<any>;

type EditComment = ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => Promise<any>;

type AddComment = ({
  content,
  parentId,
  userId,
}: {
  content: string;
  userId: string;
  parentId?: string | undefined;
}) => Promise<any>;
