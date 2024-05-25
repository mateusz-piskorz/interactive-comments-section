import { makeRequest } from "../../../services/makeRequest";

export const addLike: AddLike = ({ commentId, likeType }) => {
  return makeRequest(`/comments/${likeType}/${commentId}`, {
    method: "post",
  });
};

type AddLike = ({
  commentId,
  likeType,
}: {
  commentId: string;
  likeType: "like" | "dislike";
}) => Promise<Comment>;
