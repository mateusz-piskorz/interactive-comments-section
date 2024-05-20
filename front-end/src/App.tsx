import { FC } from "react";
import "./App.css";
import { CommentList } from "./features/CommentList";
import { Form } from "./features/Form";
import { useComment } from "./context/comment";
import { useAuth } from "./hooks/useAuth";
import { RegisterForm } from "./features/RegisterForm";

const App: FC = () => {
  const { isLogged, loading, error, setIsLogged } = useAuth();

  const registerHandler = () => {
    setIsLogged({ message: "success" });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (!isLogged && !loading) {
    return <RegisterForm onSubmit={registerHandler} />;
  }

  return <CommentSystem />;
};

const CommentSystem = () => {
  const { childComments } = useComment();
  return (
    <>
      <CommentList comments={childComments} nestingLevel={0}></CommentList>
      <Form operation="add" parentId="root" fixedPosition />
    </>
  );
};

export default App;

// w App daj logike
// if(user.logged){
//   return CommentSys
// }else{
//   return Auth
// }

// todo napisz tutaj commentsSystem component cos takeigo:
// const commentSys = ()=>{
//   const { childComments } = useComment();
//   return (
//     <>
//       <CommentList comments={childComments} nestingLevel={0}></CommentList>
//       <Form operation="add" parentId="root" fixedPosition />
//     </>
// }
