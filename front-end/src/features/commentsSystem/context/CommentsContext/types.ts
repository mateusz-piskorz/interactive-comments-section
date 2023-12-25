import { ReactNode } from "react";
import { availableAvatars } from "../../../../components/ProfileAvatar";

type UserDetails = {
  avatar: (typeof availableAvatars)[number];
  color: string;
  name: string;
  _id: string;
};

export type WritingArr = { parentId: string; authorColor: string }[];

export type Comment = {
  content: string;
  _id: string;
  createdAt: Date;
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
  writingArr: WritingArr | undefined;
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
