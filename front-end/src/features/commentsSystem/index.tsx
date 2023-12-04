import { FC } from "react";
import { App } from "./App";
import { CommentsProvider } from "./context/CommentsContext";
import { getUserDetails } from "./services/user";
import { useAsync } from "../../hooks/useAsync";

type CommentsSystemProps = {
  userId: string;
};

export const CommentsSystem: FC<CommentsSystemProps> = ({ userId }) => {
  const { error, loading, value } = useAsync(() => getUserDetails({ userId }));

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error getting user</h1>
      ) : (
        <CommentsProvider userDetails={value}>
          <App />
        </CommentsProvider>
      )}
    </>
  );
};
