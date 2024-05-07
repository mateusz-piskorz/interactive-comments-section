import { availableAvatars } from "./features/ProfileAvatar";

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
  parentId: string;
};
