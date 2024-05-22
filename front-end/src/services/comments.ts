import { makeRequest } from "./makeRequest";
import { Comment } from "../types";

export const getComments: GetComments = () => {
  return makeRequest("/comments", {
    method: "get",
  });
};

export const getComment: GetComment = ({ commentId, userId }) => {
  return makeRequest(`/comments/${commentId}`, {
    method: "post",
    data: { userId },
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

type GetComments = () => Promise<Comment[]>;

type GetComment = ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => Promise<Comment>;

type AddLike = ({
  commentId,
  userId,
  likeType,
}: {
  commentId: string;
  userId: string;
  likeType: "like" | "dislike";
}) => Promise<Comment>;
