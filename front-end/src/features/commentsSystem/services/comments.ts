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

export type GetComments = ({ userId }: { userId: string }) => Promise<any>;

export type AddComment = ({
  content,
  parentId,
  userId,
}: {
  content: string;
  userId: string;
  parentId?: string | undefined;
}) => Promise<any>;
