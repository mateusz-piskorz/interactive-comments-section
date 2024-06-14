import { FC } from "react";
import "./App.css";
import { useAuth, Auth } from "./features/Auth";
import { useComment, CommentsProvider } from "./context/comment";
import { CommentList } from "./features/CommentList";
import { Form } from "./features/Form";
import { useAnalytics } from "@owcaofficial/web-analytics";

const App: FC = () => {
  useAnalytics();
  const { user } = useAuth();

  return user ? (
    <CommentsProvider>
      <CommentsSystem />
    </CommentsProvider>
  ) : (
    <Auth />
  );
};

const CommentsSystem = () => {
  const { childComments } = useComment();
  return (
    <>
      <CommentList comments={childComments} nestingLevel={0}></CommentList>
      <Form operation="add" parentId="root" fixedPosition />
    </>
  );
};

export default App;
