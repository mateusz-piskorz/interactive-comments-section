import { Comment } from "../../types";

export type ContextType = {
  comments: Comment[];
  addComment: (comment: Comment) => void;
};
