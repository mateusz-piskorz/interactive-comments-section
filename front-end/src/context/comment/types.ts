import { Comment } from "../../types";

export type ContextType = {
  comments: Comment[];
  rootComments: Comment[];
  getReplies: (parentId: string) => Comment[] &
    {
      parentId: string;
    }[];
};
