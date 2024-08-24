import { availableAvatars } from "./features/ProfileAvatar";

export type Comment = {
  author: {
    avatar: (typeof availableAvatars)[number];
    id: string;
    username: string;
    color: string;
  };
  content: string;
  likes: string[];
  dislikes: string[];
  likesCount: number;
  createdAt: Date;
  parentId: string;
  id: string;
};
