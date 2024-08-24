import { makeRequest } from "../../../services/makeRequest";

export const addComment: AddComment = ({ content, parentId }) => {
  return makeRequest("/comments", {
    method: "post",
    data: { content, parentId },
  });
};

export const editComment: EditComment = ({ content, commentId }) => {
  return makeRequest(`/comments/${commentId}`, {
    method: "patch",
    data: { content },
  });
};

type EditComment = ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => Promise<Comment>;

type AddComment = ({
  content,
  parentId,
}: {
  content: string;
  parentId?: string | undefined;
}) => Promise<Comment>;
