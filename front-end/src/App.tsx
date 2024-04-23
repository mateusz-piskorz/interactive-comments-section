import { FC } from "react";
import "./App.css";
import { CommentList } from "./features/CommentList";
import { Form } from "./features/Form";
import { useComment } from "./context/comment";

const App: FC = () => {
  const { rootComments } = useComment();
  return (
    <>
      <CommentList comments={rootComments} nestingLevel={0}></CommentList>
      <Form operation="add" positionAbsolute />
    </>
  );
};

export default App;
