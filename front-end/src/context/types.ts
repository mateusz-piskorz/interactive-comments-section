import { ReactNode } from "react";
import { availableAvatars } from "../features/ProfileAvatar";

type UserDetails = {
  avatar: (typeof availableAvatars)[number];
  color: string;
  name: string;
  _id: string;
};

export type Comment = {
  avatar: (typeof availableAvatars)[number];
  color: string;
  content: string;
  createdAt: Date;
  dislikes: string[];
  likes: string[];
  likesCount: number;
  name: string;
  yourComment: boolean;
  _id: string;
  parentId?: string;
};

export type Likes = { [id: string]: "plus" | "minus" };

export type CommentsProviderProps = {
  children: ReactNode;
  userDetails: UserDetails;
};

export type ContextType = {
  setCanIAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  canIAddComment: boolean;
  comments: Comment[];
  rootComments: Comment[];
  getReplies: (parentId: string) => Comment[] &
    {
      parentId: string;
    }[];
  userDetails: UserDetails;
};
