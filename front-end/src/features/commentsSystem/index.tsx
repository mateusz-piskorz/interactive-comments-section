import { FC } from "react";
import { App } from "./App";
import { CommentsProvider } from "./context/CommentsContext";

type CommentsSystemProps = {
  userId: string;
};

export const CommentsSystem: FC<CommentsSystemProps> = ({ userId }) => {
  return (
    <CommentsProvider userId={userId}>
      <App />
    </CommentsProvider>
  );
};
