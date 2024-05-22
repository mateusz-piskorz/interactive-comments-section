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
