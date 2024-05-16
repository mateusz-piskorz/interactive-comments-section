import { FC } from "react";
import "./App.css";
import { CommentList } from "./features/CommentList";
import { Form } from "./features/Form";
import { useComment } from "./context/comment";

const App: FC = () => {
  const { childComments } = useComment();
  return (
    <>
      <CommentList comments={childComments} nestingLevel={0}></CommentList>
      <Form operation="add" parentId="root" fixedPosition />
    </>
  );
};

export default App;
