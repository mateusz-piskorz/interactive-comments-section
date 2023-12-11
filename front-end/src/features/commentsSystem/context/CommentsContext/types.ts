import { ReactNode } from "react";
import { availableAvatars } from "../../../../components/ProfileAvatar";

type UserDetails = {
  avatar: (typeof availableAvatars)[number];
  color: string;
  name: string;
  _id: string;
};

export type Comment = {
  content: string;
  _id: string;
  createdAt: Date;
  color: string;
  authorAvatar: (typeof availableAvatars)[number];
  authorName: string;
  yourComment: boolean;
  likes: Likes;
  parentId?: string;
};

export type Likes = { [key: string]: "plus" | "minus" };

export type CommentsProviderProps = {
  children: ReactNode;
  userDetails: UserDetails;
};

export type ContextType = {
  countDown: JSX.Element;
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
