import { makeRequest } from "../../../services/makeRequest";

export const getUserDetails: GetUserDetails = ({ userId }) => {
  return makeRequest("/users", {
    method: "post",
    data: { userId },
  });
};

export type GetUserDetails = ({ userId }: { userId: string }) => Promise<any>;
