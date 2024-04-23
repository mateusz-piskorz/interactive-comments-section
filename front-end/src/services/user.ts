import { availableAvatars } from "../features/ProfileAvatar";
import { makeRequest } from "./makeRequest";

export type UserDetails = {
  avatar: (typeof availableAvatars)[number];
  color: string;
  name: string;
  _id: string;
};

export const getUserDetails: GetUserDetails = ({ userId }) => {
  return makeRequest("/users", {
    method: "post",
    data: { userId },
  });
};

type GetUserDetails = ({ userId }: { userId: string }) => Promise<UserDetails>;

export const register: Register = ({ name, avatar, color }) => {
  return makeRequest("/users/add", {
    method: "post",
    data: { name, avatar, color },
  });
};

type Register = ({
  name,
  avatar,
  color,
}: {
  name: string;
  avatar: string;
  color: string;
}) => Promise<UserDetails>;
