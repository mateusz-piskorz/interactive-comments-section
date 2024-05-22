import { availableAvatars } from "../../../features/ProfileAvatar";
import { makeRequest } from "../../../services/makeRequest";
import { UserDetails } from "../types";

export const register: Register = ({ username, avatar, color }) => {
  return makeRequest("/users", {
    method: "post",
    data: { username, avatar, color },
  });
};

export const signIn: SignIn = ({ username, password }) => {
  return makeRequest("/users/signIn", {
    method: "post",
    data: { username, password },
  });
};

type Register = ({
  username,
  avatar,
  color,
}: {
  username: string;
  avatar: string;
  color: string;
}) => Promise<UserDetails>;

type SignIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => Promise<UserDetails>;
