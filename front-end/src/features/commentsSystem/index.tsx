import { FC } from "react";
import { App } from "./App";
import { CommentsProvider } from "./context/CommentsContext";

export const CommentsSystem: FC = () => {
  return (
    <CommentsProvider>
      <App />
    </CommentsProvider>
  );
};
