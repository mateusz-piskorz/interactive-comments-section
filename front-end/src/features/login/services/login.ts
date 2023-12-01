import { makeRequest } from "../../../services/makeRequest";

export const register: Register = ({ name, avatar, color }) => {
  return makeRequest("/users/add", {
    method: "post",
    data: { name, avatar, color },
  });
};

export const login: Login = ({ userId }) => {
  return makeRequest("/users/login", {
    method: "post",
    data: { userId },
  });
};

export type Login = ({ userId }: { userId: string }) => Promise<any>;

export type Register = ({
  name,
  avatar,
  color,
}: {
  name: string;
  avatar: string;
  color: string;
}) => Promise<any>;
