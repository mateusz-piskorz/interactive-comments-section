import { Comment } from "../../types";

export type ContextType = {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  editComment: (commentId: string, comment: Comment) => void;
};
