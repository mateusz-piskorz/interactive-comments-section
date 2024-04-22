import { makeRequest } from "./makeRequest";

export const getUserDetails: GetUserDetails = ({ userId }) => {
  return makeRequest("/users", {
    method: "post",
    data: { userId },
  });
};

type GetUserDetails = ({ userId }: { userId: string }) => Promise<any>;

export const registerService: Register = ({ name, avatar, color }) => {
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
}) => Promise<any>;
