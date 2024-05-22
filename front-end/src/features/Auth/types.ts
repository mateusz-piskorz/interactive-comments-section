import { availableAvatars } from "../ProfileAvatar";

export type UserDetails = {
  id: string;
  password: string;
  username: string;
  color: string;
  avatar: (typeof availableAvatars)[number];
  createdAt: Date;
  expires_in: number;
};
