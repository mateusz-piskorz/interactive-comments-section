import { FC, useEffect, useState } from "react";
import "./App.css";

import { CommentList } from "./features/CommentList";
import { Form } from "./features/Form";
import { useComment } from "./context/comment";
import { useAuth } from "./hooks/useAuth";
import { RegisterForm } from "./features/RegisterForm";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRes, setIsRes] = useState(false);

  console.log("rerendered");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRes(true);
    }, 5000);
  }, []);
  // const { isLogged, loading, error, setIsLogged } = useAuth();

  // const registerHandler = () => {
  //   setIsLogged({ message: "success" });
  // };

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (error) {
  //   return <h1>Error</h1>;
  // }

  // if (!isLogged && !loading) {
  //   return <RegisterForm onSubmit={registerHandler} />;
  // }

  return <h1>Hi</h1>;
  // return <CommentSystem />;
};

// const CommentSystem = () => {
//   const { childComments } = useComment();
//   return (
//     <>
//       <CommentList comments={childComments} nestingLevel={0}></CommentList>
//       <Form operation="add" parentId="root" fixedPosition />
//     </>
//   );
// };

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
