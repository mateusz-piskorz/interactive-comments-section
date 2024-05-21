import { availableAvatars } from "../../../features/ProfileAvatar";
import { makeRequest } from "../../../services/makeRequest";

export const register: Register = ({ name, avatar, color }) => {
  return makeRequest("/users", {
    method: "post",
    data: { name, avatar, color },
  });
};

export const signIn: SignIn = ({ username, password }) => {
  return makeRequest("/users/signIn", {
    method: "post",
    data: { username, password },
  });
};

export type UserDetails = {
  id: string;
  password: string;
  username: string;
  color: string;
  avatar: (typeof availableAvatars)[number];
  createdAt: Date;
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

type SignIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => Promise<{ message: string }>;
