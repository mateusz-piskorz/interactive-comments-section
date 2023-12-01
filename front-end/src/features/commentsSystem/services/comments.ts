import { makeRequest } from "../../../services/makeRequest";

export const getComments: GetComments = () => {
  return makeRequest("/comments");
};

export const addComment: AddComment = ({ content, parentId }) => {
  return makeRequest("/comments/add", {
    method: "post",
    data: { content, parentId },
  });
};

export type GetComments = () => Promise<any>;

export type AddComment = ({
  content,
  parentId,
}: {
  content: string;
  parentId?: string | undefined;
}) => Promise<any>;
